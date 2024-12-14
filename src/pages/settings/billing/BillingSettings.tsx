/*************************************************************************
 * @file BillingSettings.tsx
 * @author Ramiro Santos
 * @desc  Component for the billing settings page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/

// THIRD PARTY IMPORTS
import { NavLink, Outlet } from "react-router-dom";

// COMPONENTS
import BalanceBilling from "./context/BalanceBilling";
import PaymentMethodBilling from "./context/PaymentMethodBilling";
import PayoutMethodBilling from "./context/PayoutMethodBilling";
import BillingHistoryBilling from "./context/BillingHistoryBilling";
const BillingSettings = () => {
    return (
        <div className="flex flex-col">
            <h2 className="text-white px-3 py-4 text-xl font-semibold border-b border-eclipseGray">
                Billing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
                <div className="w-full h-full">
                    <div className="h-full">
                        <BalanceBilling />
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="h-full">
                        <PaymentMethodBilling />
                    </div>
                </div>
                <div className="w-full h-full">
                    <div className="h-full">
                        <PayoutMethodBilling />
                    </div>
                </div>
            </div>
            <div className="px-4 mt-4">
                {/* Add your billing history component here */}
                <BillingHistoryBilling />
            </div>
        </div>
    );
};

export default BillingSettings;

