/*************************************************************************
 * @file PayoutMethodBilling.tsx
 * @author Ramiro Santos
 * @desc  Component for the payout method billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


// LOCAL IMPORTS
import { ReactComponent as VisaIcon } from '../../../../assets/icons/visa.svg';

const PayoutMethodBilling = () => {
    return (
        <div className="bg-[#0A0A0A] p-6 rounded-lg h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <span className="text-white text-base">Payout Method</span>
                    <span className="text-coolGray text-xs mt-1">Add, update or remove your payout method</span>
                </div>
                <button className="flex items-center gap-2 text-coolGray hover:text-white transition-colors">
                    <span className="text-sm">Change method</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Payout Method Card */}
            <div className="flex justify-between items-center bg-[#131313] p-4 rounded-lg">
                <div className="flex items-center gap-3">
                    <div className="border border-[#3D3D3D] p-2.5 rounded-lg">
                        <VisaIcon className="w-10 h-6 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-white text-sm">Visa ending in 7879</span>
                        <span className="text-coolGray text-xs">Exp: 08/2024</span>
                    </div>
                </div>
                <button className="text-coolGray hover:text-white transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default PayoutMethodBilling; 