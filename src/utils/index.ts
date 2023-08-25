import { DirectoryResult, FileLineByLineResult, FileResult, ShareCalculationInformation } from './types';
import {join, resolve} from 'node:path';

import {createInterface} from 'node:readline';
import { createReadStream } from 'node:fs';
import events from 'node:events';
import {readdir} from 'node:fs/promises';

export const readFileDir = async (folderPath: string) => {
    // console.log(folderPath);
    const notifications: string[] = [];

    try {
        const result: DirectoryResult = {
            populatedFiles : [],
            notifications: [],
            
        };
        if(folderPath?.length <= 3) {
            throw new Error('Invalid folder path');
        }
        result.files = await readdir(folderPath, { encoding: "utf-8",});
       
        if(result.files?.length === 0) {
            notifications.push('Nothing to process');
        } else {
            result.populatedFiles = await getPopulatedFiles(result.files, folderPath);

            if(result.populatedFiles?.length === 0) {
                notifications.push('No Report files in the directory, try a subdirectory');
            }
        }
       
    
        result.notifications = notifications;
        
         return  result;
    } catch (error) {
        throw new Error(error?.toString());
    }
 
}



export const getFileType = (fileName: string): string => {
    if(fileName?.length === 0) {
        throw new Error('Empty file name found');
    }
    return fileName.split('.')?.[1]
}

export const extractProductCode = (fileName: string): string => {

    try {
        if(fileName?.length ===0) {
          throw new Error('Empty file name found');
        }
        const splitted = fileName.split('_');
        return splitted[splitted.length - 3];
    } catch (error:any) {
        throw new Error(error?.message);
    }
}

export const determineProductType = (fileName:string): string => {
    let result = '';
    try {
        const code = extractProductCode(fileName);
        const productCodes = {
            lotto:{
                name: 'LOTTO',
                value: '8'
            },
            powerball:{
                name: 'POWERBALL',
                value: '12'
            },
            dailyLotto: {
                name: 'DAILY LOTTO',
                value: '13'
            }
        };
    
        if(code?.includes('8')) {
          result = productCodes.lotto.name;
        } else if(code?.includes('12')) {
            result = productCodes.powerball.name;

        } else if(code?.includes('13')) {
            result = productCodes.dailyLotto.name;

        } else {
            result = 'UNKNOWN';
            // throw new Error('Product code does not exist');
        }
    
        return result;
    } catch (error: any) {
        throw new Error(error?.message);
    }
}

export const getPopulatedFiles = async (files: string[], folderPath: string) => {

  return Promise.all(files?.filter(v => {
    try {
        const type = getFileType(v);
        return type?.includes('rep');
    } catch (error:any) {
        throw new Error(error?.message);
    }
}).map(async(file:string) => {
        try {
            const result: FileResult = {
                fileName: file,
                fileType: getFileType(file),
                productName: determineProductType(file),
            };

            const absolutePath = resolve(folderPath);
            result.absolutePath = join(absolutePath,file);

             const processed = await processLineByLine(result.absolutePath);
             result.lines = processed?.lines;
             
             result.shareCalculations = await groupByShareCalcs(result.lines, processed?.indices);
             result.populatedShareCalculations = await extractShareCalculationInformation(result.shareCalculations);
            // console.log(`File Tester: ${file}`, result.populatedShareCalculations);
               
            return result;
          
        } catch (error:any) {
            throw new Error(error?.message);
        }
       
}));
}

export const processLineByLine = async (filePath:string): Promise<FileLineByLineResult | undefined> =>  {
    const fileStream = createReadStream(filePath);
  
    const rl = createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    try {
        const lines:any[] = [];
        const indices: any[] = [];
        rl.on('line', (line) => {
            // console.log(`Line from file: ${line}`);
            lines.push(line);
          });
      
        await events.once(rl,'close');
        const pages = lines.filter((v,i) => {
            const isHavingShareCalc = v.includes('share_calc');
            if(isHavingShareCalc) {
              indices.push(i);
            }
            return isHavingShareCalc;
        });
        // console.log(`END OF READING FILE: ${filePath}`);
        return {
            lines,
            pages,
            indices
        }


    } catch (error) {
        console.log(error);
    }

  }


  export const extractShareCalculationInformation = async (shareCalcsData: string [] []): Promise<ShareCalculationInformation []> => {
        const result = await Promise.all(shareCalcsData.map(async(shareCalc: string []) => {
            const tester:ShareCalculationInformation = {
                shareDivisions: [],
            };
            // console.log('extracted calculation',tester);
            const winningSetLine = shareCalc.find(v => v?.toLowerCase()?.includes('winning set'));
            const totalSalesLine = shareCalc.find(v => v?.toLowerCase()?.includes('total sales'));
            const drawInfoLine = shareCalc.find(v => v?.toLowerCase()?.includes('cdc'));
            tester.productName = copyFromLineAdvanced(totalSalesLine, '(', ')');
            tester.drawNumber = copyFromLineAdvanced(drawInfoLine, ':', ' ');
            const splittedWinningSet = winningSetLine?.split(' ');
            tester.rolloverNumber = splittedWinningSet?.[splittedWinningSet.length -1];
            const divisionsIdx = shareCalc.findIndex(v => v?.toLowerCase()?.includes('nbr of shares'));
            const firstTotalIdx = shareCalc.findIndex(v => v?.toLowerCase()?.includes('total'));
            tester.shareDivisions = shareCalc.slice(divisionsIdx, firstTotalIdx).filter(v => !v.toLowerCase()?.includes('div')).map(v => {
                const splitted = v.trim().split(' ').filter(v => v !== '');
                return {
                    div: splitted[0],
                    shareValue: splitted[1],
                    nbrOfShares: splitted[2],
                    payoutAmount: splitted[3]
                }
            });


            return tester;
        }));

        return result;
  }

  export const copyFromLine = (fromString: string, fromIndex: number| undefined = 0, untilIndex: number = -1) => {
      
      return fromString?.substring(fromIndex,untilIndex)?.trim();
  }

  export const copyFromLineAdvanced = (fromString: string='', fromWhat: string, untilWhere: string,isInclusive: boolean = false) => {
      const from = isInclusive ? fromString.indexOf(fromWhat) : fromString.indexOf(fromWhat)+1;
      const to = fromString.indexOf(untilWhere);
      return fromString?.substring(from,to)?.trim();
  }


  export const groupByShareCalcs = async (lines: string [], indices: number []) => {
      const tester: any [] = [];
      indices.forEach(async(v,i) => {
        tester.push(lines?.slice(v,indices[i+1]));
      });
      return tester;
  }

  export const findIndexesOf = async (whatToFind: string, arrayToFindFrom: string []) => {
    const indices = [];
    let idx = arrayToFindFrom?.indexOf(whatToFind);
    while (idx !== -1) {
      indices.push(idx);
      idx = arrayToFindFrom?.indexOf(whatToFind, idx + 1);
    }
    return indices;
  }
