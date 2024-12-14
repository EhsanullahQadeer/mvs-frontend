    /*************************************************************************
 * @file PaymentMethodBilling.tsx
 * @author Ramiro Santos
 * @desc  Component for the payment method billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import { ReactComponent as VisaIcon } from '../../../../assets/icons/visa.svg';
import { useState } from 'react';
import CreditCardModal from './CreditCardModal';

interface CreditCard {
    id: number;
    last4: string;
    expiry: string;
    isDefault: boolean;
}

const PaymentMethodBilling = () => {
    // Initial cards state
    const [cards, setCards] = useState<CreditCard[]>([
        { id: 1, last4: '7879', expiry: '08/2024', isDefault: true },
        { id: 2, last4: '4532', expiry: '11/2025', isDefault: false },
        { id: 3, last4: '9012', expiry: '03/2026', isDefault: false },
        { id: 4, last4: '6789', expiry: '12/2024', isDefault: false },
    ]);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Handle card deletion
    const handleDeleteCard = (cardId: number) => {
        const cardToDelete = cards.find(card => card.id === cardId);
        if (cardToDelete?.isDefault) {
            alert("Cannot delete default card. Please set another card as default first.");
            return;
        }
        setCards(cards.filter(card => card.id !== cardId));
    };

    // Handle setting default card
    const handleSetDefault = (cardId: number) => {
        setCards(cards.map(card => ({
            ...card,
            isDefault: card.id === cardId
        })));
    };

    // Handle new card submission
    const handleAddCard = (cardData: {
        cardNumber: string;
        expiryDate: string;
        cvv: string;
        cardholderName: string;
    }) => {
        const newCard: CreditCard = {
            id: Math.max(...cards.map(c => c.id)) + 1,
            last4: cardData.cardNumber.slice(-4),
            expiry: cardData.expiryDate,
            isDefault: false
        };
        setCards([...cards, newCard]);
        setIsModalOpen(false);
    };

    return (
        <div className="bg-[#0A0A0A] p-6 rounded-lg h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <div className="flex flex-col">
                    <span className="text-white text-base">Payment method</span>
                    <span className="text-coolGray text-xs mt-1">Add, update or remove your billing method</span>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#131313] px-3 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                >
                    <span className="text-white text-sm">New Card</span>
                    <span className="text-white">+</span>
                </button>
            </div>
            
            <div 
                className="space-y-3 overflow-y-auto max-h-[240px] pr-2 scrollbar-custom"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#3D3D3D transparent'
                }}
            >
                {cards.map((card) => (
                    <div key={card.id} className="flex justify-between items-center bg-[#131313] p-4 rounded-lg">
                        <div className="flex items-center gap-3">
                            <div className="border border-[#3D3D3D] p-2.5 rounded-lg">
                                <VisaIcon className="w-10 h-6 text-blue-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-sm">Visa ending in {card.last4}</span>
                                <span className="text-coolGray text-xs">Exp: {card.expiry}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => handleSetDefault(card.id)}
                                className={`text-black text-xs px-4 py-2 rounded-full transition-colors
                                    ${card.isDefault 
                                        ? 'bg-[#9EFF00] hover:bg-[#8CE000]' 
                                        : 'bg-[#131313] text-coolGray hover:text-white hover:bg-[#1a1a1a]'}`}
                            >
                                {card.isDefault ? 'Default' : 'Set Default'}
                            </button>
                            <button 
                                onClick={() => handleDeleteCard(card.id)}
                                className="text-coolGray hover:text-white transition-colors"
                                disabled={card.isDefault}
                                title={card.isDefault ? "Cannot delete default card" : "Delete card"}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <CreditCardModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddCard}
            />
        </div>
    );
};

export default PaymentMethodBilling;