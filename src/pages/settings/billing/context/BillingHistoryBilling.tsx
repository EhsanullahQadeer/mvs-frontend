/*************************************************************************
 * @file BillingHistoryBilling.tsx
 * @author Ramiro Santos
 * @desc  Component for the billing history billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import { useState } from 'react';

interface Transaction {
    id: number;
    date: string;
    description: string;
    amount: number;
    transactionType: string;
    paymentMethod: string;
    state: string;
}

const BillingHistoryBilling = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([
        {
            id: 1,
            date: '08/22/2024',
            description: 'Sale of sample pack "Urban Beats"',
            amount: 120.00,
            transactionType: 'Tipping',
            paymentMethod: 'Visa ****1234',
            state: 'Completed'
        },
        {
            id: 2,
            date: '08/15/2024',
            description: 'Commission for sample sales',
            amount: -30.00,
            transactionType: 'Expense (Demo Submission)',
            paymentMethod: 'Visa ****1234',
            state: 'Completed'
        },
        {
            id: 3,
            date: '08/10/2024',
            description: 'Monthly subscription - Pro Plan',
            amount: -29.99,
            transactionType: 'Expense (Subscription)',
            paymentMethod: 'Visa ****1234',
            state: 'Completed'
        },
        {
            id: 4,
            date: '08/01/2024',
            description: 'Upgrade to Pro Plan (fee difference)',
            amount: -20.00,
            transactionType: 'Expense (Subscription)',
            paymentMethod: 'Visa ****1234',
            state: 'Completed'
        }
    ]);

    return (
        <div className="bg-[#0A0A0A] p-6 rounded-lg h-full flex flex-col">
            <h3 className="text-white text-base mb-2">Billing history</h3>
            <span className="text-coolGray text-xs mb-6">Review your recent payments and charges.</span>
            
            <div 
                className="overflow-y-auto max-h-[400px] border border-[#3D3D3D] rounded-lg scrollbar-custom"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3D3D3D transparent'
                }}
            >
                <table className="w-full">
                    <thead className="sticky top-0 bg-[#131313]">
                        <tr className="text-left text-coolGray text-sm">
                            <th className="px-6 py-4">Date</th>
                            <th className="px-6 py-4">Description</th>
                            <th className="px-6 py-4">Amount</th>
                            <th className="px-6 py-4">Transaction type</th>
                            <th className="px-6 py-4">Payment method</th>
                            <th className="px-6 py-4">State</th>
                            <th className="px-6 py-4"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-[#1C1C1C]">
                        {transactions.map((transaction) => (
                            <tr key={transaction.id} className="text-sm border-b border-[#242424] last:border-b-0">
                                <td className="px-6 py-4 text-coolGray">{transaction.date}</td>
                                <td className="px-6 py-4 text-white">{transaction.description}</td>
                                <td className="px-6 py-4 text-white">
                                    {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-coolGray">{transaction.transactionType}</td>
                                <td className="px-6 py-4 text-coolGray">{transaction.paymentMethod}</td>
                                <td className="px-6 py-4 text-coolGray">{transaction.state}</td>
                                <td className="px-6 py-4">
                                    <button className="text-coolGray hover:text-white transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 bg-[#1C1C1C] rounded-lg p-4">
                <div className="flex flex-col">
                    <span className="text-white text-base mb-2">View All Transactions</span>
                    <div className="flex justify-between items-center text-xs">
                        <div className="flex items-center gap-2">
                            <span className="text-coolGray">Click here to access a full view of your invoices and receipts</span>
                        </div>
                        <button className="bg-[#131313] text-white px-4 py-2 rounded-full hover:bg-[#242424] transition-colors">
                            View All
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BillingHistoryBilling; 