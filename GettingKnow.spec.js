import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import MockStoreProvider from '../../../MockStoreProvider/MockStoreProvider;
import GettingKnow from '../GettingKnow';

afterEach(cleanup);

const mockProps = {
    customerDetails : {
        dependentsAgeList: [4,7],
        dependents: 2,
    }
}

const mockStore = {
    applicantData: {
        userData: {
            attributes: {
                dependents: 2,
            },
        },
    },
};

const wrapper = ({ incomingProps, incomingStore } = {}) => {
    const props = Object.assign({}, mockProps, incomingProps);
    const appState = Object.assign({}, mockStore, incomingStore);

    return render(
        <MockStoreProvider appState={appState}>
            <GettingKnow {...props} />
        </MockStoreProvider>
    );
};

describe('GettingKnow component', () => {
    it('should match snapshot', () => {
        const { asFragment } = wrapper(mockProps, mockStore);
        expect(asFragment()).toMatchSnapshot();
    })
    it('should render the component', () => {
        const { container } = wrapper(mockProps, mockStore);
        expect(container).toBeTruthy();
    });
});