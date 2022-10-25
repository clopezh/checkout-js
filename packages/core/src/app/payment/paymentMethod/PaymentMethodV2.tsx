import { PaymentMethod } from '@bigcommerce/checkout-sdk';
import React, { ComponentType } from 'react';

import {
    PaymentFormValues,
    PaymentMethodResolveId,
    PaymentMethodProps as ResolvedPaymentMethodProps,
} from '@bigcommerce/checkout/payment-integration-api';

import { withCheckout, WithCheckoutProps } from '../../checkout';
import { connectFormik, WithFormikProps } from '../../common/form';
import { withLanguage, WithLanguageProps } from '../../locale';
import { withForm, WithFormProps } from '../../ui/form';
import createPaymentFormService from '../createPaymentFormService';
import { withHostedCreditCardFieldset, WithInjectedHostedCreditCardFieldsetProps } from '../hostedCreditCard';
import resolvePaymentMethod from '../resolvePaymentMethod';
import withPayment, { WithPaymentProps } from '../withPayment';

import { default as PaymentMethodV1 } from './PaymentMethod';

export interface PaymentMethodProps {
    method: PaymentMethod;
    isEmbedded?: boolean;
    isUsingMultiShipping?: boolean;
    resolveComponent?(
        query: PaymentMethodResolveId,
    ): ComponentType<ResolvedPaymentMethodProps> | undefined;
    onUnhandledError(error: Error): void;
}

const PaymentMethodContainer: ComponentType<
    PaymentMethodProps &
        WithInjectedHostedCreditCardFieldsetProps &
        WithCheckoutProps &
        WithLanguageProps &
        WithPaymentProps &
        WithFormProps &
        WithFormikProps<PaymentFormValues>
> = ({
    formik: formikContext,
    checkoutService,
    checkoutState,
    disableSubmit,
    hidePaymentSubmitButton,
    isEmbedded,
    isSubmitted,
    isUsingMultiShipping,
    language,
    method,
    onUnhandledError,
    resolveComponent = resolvePaymentMethod,
    setSubmit,
    setSubmitted,
    setValidationSchema,
    getHostedFormOptions,
    getHostedStoredCardValidationFieldset,
    hostedStoredCardValidationSchema,
    hostedFieldset,
    hostedValidationSchema
}) => {
    const formContext = {
        isSubmitted,
        setSubmitted,
    };

    const paymentContext = {
        disableSubmit,
        hidePaymentSubmitButton,
        setSubmit,
        setValidationSchema,
    };

    const ResolvedPaymentMethod = resolveComponent({
        id: method.id,
        gateway: method.gateway,
        type: method.type,
    });

    if (!ResolvedPaymentMethod) {
        return (
            <PaymentMethodV1
                isEmbedded={isEmbedded}
                isUsingMultiShipping={isUsingMultiShipping}
                method={method}
                onUnhandledError={onUnhandledError}
            />
        );
    }

    return (
        <ResolvedPaymentMethod
            checkoutService={checkoutService}
            checkoutState={checkoutState}
            language={language}
            method={method}
            onUnhandledError={onUnhandledError}
            paymentForm={createPaymentFormService(formikContext, formContext, paymentContext)}
            getHostedStoredCardValidationFieldset={getHostedStoredCardValidationFieldset}
            getHostedFormOptions={getHostedFormOptions}
            hostedStoredCardValidationSchema={hostedStoredCardValidationSchema}
            hostedFieldset={hostedFieldset}
            hostedValidationSchema={hostedValidationSchema}
        />
    );
};

export default withCheckout((props) => props)(
    withHostedCreditCardFieldset(withLanguage(withPayment(withForm(connectFormik(PaymentMethodContainer))))),
) as ComponentType<PaymentMethodProps & WithInjectedHostedCreditCardFieldsetProps>;
