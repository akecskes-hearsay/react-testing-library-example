import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from "@testing-library/user-event";
import snapshotDiff from 'snapshot-diff';
import App from './App';

describe('App', () => {
    
    test('renders App component then tests snapshot that succeeds without error', async () => {
        const {container} = render(<App/>);
        expect(screen.queryByText(/Signed in as/)).toBeNull();
        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    test('renders App component then logs out - with regular snapshots', async () => {
        const {container} = render(<App/>);
        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();

        expect(container).toMatchSnapshot();

        const logoutButton = screen.getByTestId('button-logout')
        userEvent.click(logoutButton)

        expect(container).toMatchSnapshot();

        const loginButton = screen.getByTestId('button-login')
        userEvent.click(loginButton)

        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
        expect(container).toMatchSnapshot();

    });

    test('renders App component then logs out - with snapshot diffs', async () => {
        const {container} = render(<App/>);
        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();

        const snapshot1 = container.cloneNode(true)
        expect(snapshot1).toMatchSnapshot();

        const logoutButton = screen.getByTestId('button-logout')
        screen.logTestingPlaygroundURL()
        userEvent.click(logoutButton)

        const snapshot2 = container.cloneNode(true)
        expect(snapshotDiff(snapshot1, snapshot2)).toMatchSnapshot();

        const loginButton = screen.getByTestId('button-login')
        userEvent.click(loginButton)

        expect(await screen.findByText(/Signed in as/)).toBeInTheDocument();
        const snapshot3 = container.cloneNode(true)
        expect(snapshotDiff(snapshot2, snapshot3)).toMatchSnapshot();
    });

});
