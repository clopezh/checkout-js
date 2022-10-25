import {
    CheckoutSelectors,
    CheckoutService,
    LanguageService,
    PaymentMethod,
} from '@bigcommerce/checkout-sdk';
import { WithInjectedHostedCreditCardFieldsetProps } from '../../core/src/app/payment/hostedCreditCard';

import PaymentFormService from './PaymentFormService';

export default interface PaymentMethodProps extends WithInjectedHostedCreditCardFieldsetProps {
    method: PaymentMethod;
    checkoutService: CheckoutService;
    checkoutState: CheckoutSelectors;
    paymentForm: PaymentFormService;
    language: LanguageService;
    onUnhandledError(error: Error): void;
}
