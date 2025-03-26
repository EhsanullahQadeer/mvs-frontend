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
        <div>
            <StripeElements paymentMethodComponentProps={{}} />
        </div>
    );
};

export default PaymentMethodBilling;