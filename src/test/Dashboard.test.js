import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../routes/Dashboard/Dashboard'

describe(`ConsolePage Component`, () => {
    describe(`Smoke test`, () => {
        it(`Renders without crashing`, () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <BrowserRouter>
                        <Dashboard />
                </BrowserRouter>,
                div);
            ReactDOM.unmountComponentAtNode(div);
        });
    })
});