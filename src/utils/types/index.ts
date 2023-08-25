
export interface FileResult {
    fileName: string;
    fileType: string;
    productName?: string;
    rolloverNumber?: string;
    drawNumber?: string;
    absolutePath?: string;
    lines?: any;
    shareCalculations?: any;
    populatedShareCalculations?: ShareCalculationInformation[];
}

export interface FileLineByLineResult {
    lines?: any;
    pages?: any;
    indices?: any;
}

export interface DirectoryResult {
    files?: string [];
    notifications: string [];
    populatedFiles: FileResult [];

}

export interface ShareDivisionI {
   shareValue?: string;
   div?: string;
   nbrOfShares?: string;
   payoutAmount?: string;
}

export interface ShareCalculationInformation {
    productName?: string;
    drawNumber?: string;
    nextRolloverAmount?: string;
    rolloverNumber?: string;
    shareDivisions:ShareDivisionI[];

}