import { PaymentMethod } from "@bigcommerce/checkout-sdk";

export function getMethod(): PaymentMethod {
    return {
        id: 'applepay',
        gateway: 'mollie',
        logoUrl: '',
        method: 'credit-card',
        supportedCards: [
            'VISA',
            'AMEX',
            'MC',
        ],
        initializationData: { },
        config: {
            displayName: 'Mollie Apple Pay',
            cardCode: true,
            enablePaypal: undefined,
            hasDefaultStoredInstrument: false,
            helpText: '',
            is3dsEnabled: undefined,
            isVisaCheckoutEnabled: undefined,
            merchantId: undefined,
            testMode: false,
        },
        type: 'PAYMENT_TYPE_API',
    };
}
