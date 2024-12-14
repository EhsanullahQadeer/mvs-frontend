/*************************************************************************
 * @file BalanceBilling.tsx 
 * @author Ramiro Santos
 * @desc  Component for the balance billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import { useState } from 'react';

const BalanceBilling = () => {
    const currencies = [
        { code: 'USD', symbol: '$' },
        { code: 'EUR', symbol: '€' },
        { code: 'GBP', symbol: '£' }
    ];

    const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
    const [balance, setBalance] = useState(120.00);
    const [pendingAmount, setPendingAmount] = useState(20.00);

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = currencies.find(cur => cur.code === e.target.value);
        if (newCurrency) {
            setSelectedCurrency(newCurrency);
        }
    };

    return (
        <div className="bg-[#0A0A0A] p-6 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <span className="text-white text-base">Available Balance</span>
                    <span className="text-coolGray text-xs mt-1">View your current balance and pending payments</span>
                </div>
                <div className="relative">
                    <select
                        value={selectedCurrency.code}
                        onChange={handleCurrencyChange}
                        className="appearance-none bg-[#131313] text-white text-sm px-3 py-2 pr-8 rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3D3D3D]"
                    >
                        {currencies.map((currency) => (
                            <option key={currency.code} value={currency.code}>
                                {currency.code} {currency.symbol}
                            </option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>
            
            <div className="flex items-baseline gap-1 mb-6">
                <span className="text-white text-3xl font-semibold">
                    {selectedCurrency.symbol}{balance.toFixed(2)}
                </span>
                <span className="text-coolGray text-xs">
                    +{selectedCurrency.symbol}{pendingAmount.toFixed(2)} Pending
                </span>
            </div>

            <div className="mt-auto border border-[#3D3D3D] rounded-lg p-4">
                <span className="text-coolGray text-xs">
                    Payouts are unavailable until verification is complete.
                </span>
            </div>
        </div>
    );
};

export default BalanceBilling; 