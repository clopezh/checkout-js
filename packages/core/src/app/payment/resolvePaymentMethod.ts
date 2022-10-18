import { ComponentType } from 'react';

import {
    PaymentMethodProps,
    PaymentMethodResolveId,
} from '@bigcommerce/checkout/payment-integration-api';

import { resolveComponent } from '../common/resolver';
import * as paymentMethods from '../generated/paymentIntegrations';
import { WithInjectedHostedCreditCardFieldsetProps } from './hostedCreditCard';
import { MolliePaymentMethodsProps } from './paymentMethod/MolliePaymentMethod';

export default function resolvePaymentMethod(
    query: PaymentMethodResolveId,
): ComponentType<PaymentMethodProps | MolliePaymentMethodsProps & WithInjectedHostedCreditCardFieldsetProps> | undefined {
    return resolveComponent<PaymentMethodResolveId, PaymentMethodProps | MolliePaymentMethodsProps & WithInjectedHostedCreditCardFieldsetProps>(query, paymentMethods);
}
