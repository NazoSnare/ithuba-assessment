import { FileResult, ShareCalculationInformation, ShareDivisionI } from '@/utils/types';
import React, { useEffect, useState } from 'react'

import Result from '../Result/Result';
import { readFileDir } from '@/utils';

const Analysis = () => {
  const [filePath, setFilePath] = useState('');
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [shareCalculations, setShareCalculations] = useState<any>([]);
  const [fade, setFade] = useState(false);

  const reset = () => {
    setError('');
    setNotifications([]);
    setShareCalculations([]);
  }

  const traverseContents = async (path: string) => {

    try { 
     reset();
     const data = await readFileDir(path);

     setNotifications(data?.notifications);
     const test = data?.populatedFiles.map(file => file.populatedShareCalculations);
     setShareCalculations(test.flat());
    
    } catch (error: any) {
        console.log('caught error',error);
        setError(error?.message);
    }
   }


   useEffect(() => {

   }, []);

   useEffect(() => {

    if(filePath?.length > 3) {
        console.log('Filepath is added');
    }else {
        console.log('Filepath is not sufficient');

    }

   }, [filePath]);

  return (
    <div className='page-container'>
        <h1>Ithuba Analysis</h1>
        <div className="folder-request">
            <p className='folder-request-question'> Please enter the folder path: </p>
        </div>
        <div className="search">
           <input type="text" value={filePath} onChange={e => {
                setFilePath(e.target.value);
            }} placeholder='Enter absolute path including Drive' className='folder-request-input' />
            <div onClick={async () => {
                setFade(true);
                await traverseContents(filePath);
            }} className={`folder-request-cta ${fade ? 'fade': ''}`} onAnimationEnd={() => {
                setFade(false);
            }}>
               <span className='folder-request-cta-text'>Generate results</span>
            </div>
           </div>

        <div className="results-wrapper">
            {error?.length > 1 &&(<div className='error-name'>{error}</div>)}
            {notifications?.map(notification => (<div key={notification} className='notification-name'>{notification}</div>))}
            {shareCalculations?.length > 0 &&(
                <div className='results-container'>
                  {shareCalculations?.map((share:ShareCalculationInformation) => (<Result key={share.productName} data={share} />))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Analysis;