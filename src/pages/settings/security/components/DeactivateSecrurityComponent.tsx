/*************************************************************************
 * @file DeactivateSecurityComponent.tsx
 * @author Ramiro Santos
 * @desc  Component for the Deactivation security page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

import React, { useState } from 'react';
import { InputModal, ConfirmationModal } from './SecurityModal';

const DeactivateSecurityComponent = () => {
    const [isDeactivationModalOpen, setIsDeactivationModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const openDeactivationModal = () => setIsDeactivationModalOpen(true);
    const closeDeactivationModal = () => setIsDeactivationModalOpen(false);
    const openConfirmationModal = () => {
        closeDeactivationModal();
        setIsConfirmationModalOpen(true);
    };
    const closeConfirmationModal = () => setIsConfirmationModalOpen(false);

    const handleDeactivation = (password: string) => {
        // Here you would typically verify the password
        // For this example, we'll just proceed to the confirmation modal
        openConfirmationModal();
    };

    const confirmDeactivation = () => {
        console.log("Account deactivation confirmed");
        closeConfirmationModal();
        // Add actual deactivation logic here
    };

    return (
        <div className="px-3 flex flex-col">
            <div className="py-3 flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-semibold text-platinum">Deactivate my account</h3>
                    <p className="text-sm font-normal text-coolGray">
                        Deactivate your accounts and profiles for a while or delete them permanently
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <button 
                        onClick={openDeactivationModal}
                        className="text-[#615e5e] px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                    >
                        Deactivate       
                    </button>
                    {isDeactivationModalOpen && (
                        <InputModal
                            title="Delete Account"
                            text="To complete your deactivation request, please enter the password associated with your account."
                            onSubmit={handleDeactivation}
                            onClose={closeDeactivationModal}
                        />
                    )}
                    {isConfirmationModalOpen && (
                        <ConfirmationModal
                            title="Are you sure you want to delete your account?"
                            text="Deleting your account is permanent and cannot be undone. All your data, including samples, bids, and personal information, will be permanently removed. If you wish to keep your account but take a break, you may want to consider deactivating it instead. If you proceed with deletion, you will lose access to all account features and data."
                            onConfirm={confirmDeactivation}
                            onCancel={closeConfirmationModal}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DeactivateSecurityComponent;
