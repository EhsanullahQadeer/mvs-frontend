    /*************************************************************************
 * @file PaymentMethodBilling.tsx
 * @author Ramiro Santos
 * @desc  Component for the payment method billing page. 
 *
 * @copyright (c) 2024 MVSSIVE. All rights reserved.
 *************************************************************************/


import StripeElements from 'components/stripe/stripeElements';

const PaymentMethodBilling = () => {
    return (
        <div className="p-6">
            <div className="flex flex-col">
                <h3 className="text-white text-base mb-1">Payment method</h3>
                <span className="text-coolGray text-xs mb-6">Add or update your payment method.</span>
            </div>
            <StripeElements paymentMethodComponentProps={{}} />
        </div>
    );
};

export default PaymentMethodBilling;