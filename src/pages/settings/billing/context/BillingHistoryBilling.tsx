/*************************************************************************
 * @file BillingHistoryBilling.tsx
 * @author Ramiro Santos
 * @desc  Component for the billing history billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import axios from '../../../../api/axios';
import { useEffect, useState } from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
interface Transaction {
    id: number;
    timestamp: string;
    description: string;
    amount: number;
    type: string;
    paymentMethod: string;
    status: string;
}

const BillingHistoryBilling = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [viewAll, setViewAll] = useState<boolean>(false);
    const [skip, setSkip] = useState<number>(0);
    const [take, setTake] = useState<number>(4);
    const [total, setTotal] = useState<number>(0);
    async function getBillingHistory() {
        const response = await axios.get(`/users/transaction-history?skip=${skip}&take=${take}`);
        setTotal(response.data?.results?.total ?? 0);
        setTransactions(response.data?.results?.transactions ?? []);

    }
    function getDate(date: string) {
        const d = new Date(date);
        return `${d.getMonth()}/${d.getDay()}/${d.getFullYear()}`
    }

    useEffect(() => {
        getBillingHistory();
    }, [skip, take])


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
                                <td className="px-6 py-4 text-coolGray">{getDate(transaction.timestamp)}</td>
                                <td className="px-6 py-4 text-white">{transaction.description}</td>
                                <td className="px-6 py-4 text-white">
                                    {Number(transaction.amount) >= 0 ? '+' : ''}{Number(transaction.amount).toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-coolGray">{transaction.type}</td>
                                <td className="px-6 py-4 text-coolGray">{transaction.paymentMethod}</td>
                                <td className="px-6 py-4 text-coolGray">{transaction.status}</td>
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
            {viewAll ?
                <div className="flex justify-end mt-2 gap-2 items-center">
                    <span className="text-coolGray text-xs">Showing {skip + 1} - {skip + take > total ? total : skip + take} of {total} transactions</span>
                    <div className="flex items-center gap-2">
                        <button disabled={skip - take < 0} className={`bg-[#131313] text-white px-4 py-2 rounded-full ${skip - take < 0 ? "" : "hover:bg-[#242424]"} transition-colors text-xs` } onClick={() => {setSkip(skip - take < 0 ? 0 : skip - take)}}>
                            <IoChevronBackOutline className={`w-5 h-5 ${skip - take < 0 ? 'opacity-50' : ''}`} />
                        </button>
                        <button disabled={skip + take > total} className={`bg-[#131313] text-white px-4 py-2 rounded-full ${skip + take > total ? "" : "hover:bg-[#242424]"} transition-colors text-xs`} onClick={() => { setSkip(skip + take > total ? total-skip : skip + take);}}>
                            <IoChevronForwardOutline className={`w-5 h-5 ${skip + take > total ? 'opacity-50' : ''}`} />
                        </button>
                    </div>
                </div> : <div className="flex justify-end mt-2">
                    <button className="bg-[#131313] text-white px-4 py-2 rounded-full hover:bg-[#242424] transition-colors text-xs" onClick={() => { setViewAll(true); setTake(10) }}>
                        View All
                    </button>
                </div>}
        </div>
    )
};

export default BillingHistoryBilling; 