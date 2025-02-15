import { HostedPaymentMethodProps } from '@bigcommerce/checkout-js/payment-integration';
import { PaymentInitializeOptions } from '@bigcommerce/checkout-sdk';
import React, { useCallback, FunctionComponent } from 'react';

import HostedPaymentMethod from './HostedPaymentMethod';

export interface PaypalExpressPaymentMethodProps extends HostedPaymentMethodProps {
    isEmbedded?: boolean;
}

const PaypalExpressPaymentMethod: FunctionComponent<PaypalExpressPaymentMethodProps> = ({
    initializePayment,
    isEmbedded = false,
    ...rest
}) => {
    const initializePaypalExpressPayment = useCallback((options: PaymentInitializeOptions) => initializePayment({
        ...options,
        paypalexpress: {
            useRedirectFlow: isEmbedded,
        },
    }), [initializePayment, isEmbedded]);

    return <HostedPaymentMethod
        { ...rest }
        initializePayment={ initializePaypalExpressPayment }
    />;
};

export default PaypalExpressPaymentMethod;
