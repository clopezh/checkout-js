import React, { useCallback, useContext, FunctionComponent } from 'react';
import { Omit } from 'utility-types';

import { connectFormik, ConnectFormikProps } from '../../common/form';
import { Button } from '../../ui/button';
import { FormContext } from '../../ui/form';
import PaymentContext from '../PaymentContext';
import { PaymentFormValues } from '../PaymentForm';

import HostedWidgetPaymentMethod, { HostedWidgetPaymentMethodProps } from './HostedWidgetPaymentMethod';

export type DigitalRiverPaymentMethodProps = Omit<HostedWidgetPaymentMethodProps, 'containerId'> & ConnectFormikProps<PaymentFormValues>;

export enum DigitalRiverClasses {
    base =  'DRElement',
    complete = 'complete',
    empty = 'empty',
    focus = 'focus',
    invalid = 'invalid',
    webkitAutofill = 'autofill',
}

const DigitalRiverPaymentMethod: FunctionComponent<DigitalRiverPaymentMethodProps> = ({
    initializePayment,
    onUnhandledError,
    formik: { submitForm },
    ...rest
}) => {

    const paymentContext = useContext(PaymentContext);
    const { setSubmitted } = useContext(FormContext);
    const [shouldShowVatIdContainer, setShouldShowVatIdContainer] = React.useState(true);
    const vatContainerId = 'vatId';

    const initializeDigitalRiverPayment = useCallback(options => initializePayment({
        ...options,
        digitalriver: {
            container: 'drop-in',
            configuration: {
                flow: 'checkout',
                showSavePaymentAgreement: false,
                showComplianceSection: true,
                button: {
                    type: 'submitOrder',
                },
                usage: 'unscheduled',
                showTermsOfSaleDisclosure: true,
                paymentMethodConfiguration: {
                    classes: DigitalRiverClasses,
                },
            },
            onRenderButton: () => {
                paymentContext?.hidePaymentSubmitButton?.(rest.method, true);
            },
            submitForm: () => {
                setSubmitted(true);
                submitForm();
            },
            onError: (error: Error) => {
                onUnhandledError?.(error);
            },
        },
    }), [initializePayment, submitForm, paymentContext, rest.method, setSubmitted, onUnhandledError]);

    const onError = (error: Error) => {
        paymentContext?.disableSubmit(rest.method, true);

        onUnhandledError?.(error);
    };

    const vatIdContinueButtonOnClick = () => {
        setShouldShowVatIdContainer(false);
    };

    const renderVatIdContainer = () => {
        return (
            <div>
                <p>VAT ID:</p>
                <br />
                <input
                    id={ vatContainerId }
                    tabIndex={ -2 }
                />
                <br />
                <Button
                    className="optimizedCheckout-buttonSecondary"
                    onClick={ vatIdContinueButtonOnClick }
                    type="button"
                >
                    Continue
                </Button>
            </div>
        );
    };

    return(
        <div>
            { shouldShowVatIdContainer && renderVatIdContainer() }
            { !shouldShowVatIdContainer && <HostedWidgetPaymentMethod
                { ...rest }
                containerId="drop-in"
                initializePayment={ initializeDigitalRiverPayment }
                onUnhandledError={ onError }
            /> }
        </div>
    );
};

export default connectFormik(DigitalRiverPaymentMethod);
