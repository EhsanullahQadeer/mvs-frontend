/*************************************************************************
 * @file CreditCardModal.tsx
 * @author Ramiro Santos
 * @desc  Component for the credit card modal. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import { useState } from 'react';

interface CreditCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (cardData: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        cardholderName: string;
    }) => void;
}

const CreditCardModal = ({ isOpen, onClose, onSubmit }: CreditCardModalProps) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');

    // Format card number with spaces
    const formatCardNumber = (value: string) => {
        const numbers = value.replace(/\D/g, '');
        const chars = numbers.split('');
        const result = chars.reduce((acc, curr, i) => {
            if (i % 4 === 0 && i !== 0) return `${acc} ${curr}`;
            return `${acc}${curr}`;
        }, '');
        return result;
    };

    // Handle card number change
    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCardNumber(e.target.value);
        if (formattedValue.replace(/\s/g, '').length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({
            cardNumber: cardNumber.replace(/\s/g, ''), // Remove spaces before submitting
            expiryDate,
            cvv,
            cardholderName
        });
        resetForm();
    };

    const resetForm = () => {
        setCardNumber('');
        setExpiryDate('');
        setCvv('');
        setCardholderName('');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0A0A0A] rounded-lg p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white text-lg font-semibold">Add New Card</h3>
                    <button 
                        onClick={onClose}
                        className="text-coolGray hover:text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="block text-coolGray text-sm">Cardholder Name</label>
                        <input
                            type="text"
                            value={cardholderName}
                            onChange={(e) => setCardholderName(e.target.value)}
                            className="w-full bg-[#131313] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3D3D3D]"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-coolGray text-sm">Card Number</label>
                        <input
                            type="text"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            className="w-full bg-[#131313] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3D3D3D]"
                            placeholder="1234 5678 9012 3456"
                            maxLength={19} // 16 digits + 3 spaces
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="block text-coolGray text-sm">Expiry Date</label>
                            <input
                                type="text"
                                value={expiryDate}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '');
                                    if (value.length <= 4) {
                                        const month = value.slice(0, 2);
                                        const year = value.slice(2);
                                        setExpiryDate(value.length > 2 ? `${month}/${year}` : value);
                                    }
                                }}
                                className="w-full bg-[#131313] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3D3D3D]"
                                placeholder="MM/YY"
                                maxLength={5}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-coolGray text-sm">CVV</label>
                            <input
                                type="text"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                className="w-full bg-[#131313] text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#3D3D3D]"
                                placeholder="123"
                                maxLength={3}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm text-coolGray hover:text-white transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm bg-[#9EFF00] text-black rounded-full hover:bg-[#8CE000] transition-colors"
                        >
                            Add Card
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreditCardModal;
