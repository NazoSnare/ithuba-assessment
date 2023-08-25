import { FileResult, ShareCalculationInformation } from '@/utils/types';
import React, { useEffect } from 'react';

export interface ResultProps {
  data?: ShareCalculationInformation;
}

const Result: React.FC<ResultProps> = (props) => {
    useEffect(()=> {
        // console.log('Result:',props.data);

    },[])
  return (
    <div className='result'>
        <table cellSpacing={0}>
            <tbody>
                <tr>
                    <th>Product Name:</th>
                    <td>{props?.data?.productName ?? 'LOTTO DuMMY'}</td>
                    <th></th>
                    <th>Draw Number:</th>
                    <td>{(props?.data?.drawNumber ?? 236)}</td>
                </tr>
                <tr>
                    <th>Next Draw Rollover:</th>
                    <td>R ...</td>
                    <th></th>
                    <th>Rollover Number:</th>
                    <td>{+(props?.data?.rolloverNumber ?? 2)}</td>
                </tr>
                <tr></tr>
                <tr>
                    <th className='text-center'>Div</th>
                    <th>Share value</th>
                    <th> Nbr of Shares</th>
                    <th>Payout Amount</th>
                    <th></th>
                </tr>
                {props.data?.shareDivisions.map((v) => (
                <tr  key={v.div}>
                <td className='text-center'>{v.div}</td>
                <td>{v.shareValue}</td>
                <td className='text-center'>{v.nbrOfShares}</td>
                <td>{v.payoutAmount}</td>
                <td></td>
            </tr>
                ))}
            
            </tbody>
        </table>
    </div>
  )
}

export default Result;