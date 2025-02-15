import { HostedPaymentMethodProps, PaymentMethodId } from '@bigcommerce/checkout-js/payment-integration';
import { mount } from 'enzyme';
import React, { FunctionComponent } from 'react';

import { getPaymentMethod } from '../payment-methods.mock';

import BoltClientPaymentMethod from './BoltClientPaymentMethod';
import BoltEmbeddedPaymentMethod from './BoltEmbeddedPaymentMethod';
import BoltPaymentMethod from './BoltPaymentMethod';
import HostedPaymentMethod from './HostedPaymentMethod';
import HostedWidgetPaymentMethod from './HostedWidgetPaymentMethod';

describe('when using Bolt payment', () => {
    let defaultProps: HostedPaymentMethodProps;
    let PaymentMethodTest: FunctionComponent;

    beforeEach(() => {
        defaultProps = {
            initializePayment: jest.fn(),
            deinitializePayment: jest.fn(),
            method: {
                ...getPaymentMethod(),
                id: PaymentMethodId.Bolt,
                initializationData: {
                    embeddedOneClickEnabled: false,
                },
            },
        };

        PaymentMethodTest = props => (
            <BoltPaymentMethod { ...defaultProps } { ...props } />
        );
    });

    it('renders as bolt client payment method if embeddedOneClickEnabled is false', () => {
        defaultProps.method.initializationData.embeddedOneClickEnabled = false;

        const container = mount(<PaymentMethodTest />);

        expect(container.find(BoltClientPaymentMethod).length).toEqual(1);
        expect(container.find(HostedPaymentMethod).length).toEqual(1);
    });

    it('renders as bolt embedded payment method if embeddedOneClickEnabled is true', () => {
        defaultProps.method.initializationData.embeddedOneClickEnabled = true;

        const container = mount(<PaymentMethodTest />);

        expect(container.find(BoltEmbeddedPaymentMethod).length).toEqual(1);
        expect(container.find(HostedWidgetPaymentMethod).length).toEqual(1);
    });
});
