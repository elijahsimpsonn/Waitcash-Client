import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Login from '../routes/LogIn/Login'

describe(`ConsolePage Component`, () => {
    describe(`Smoke test`, () => {
        it(`Renders without crashing`, () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <BrowserRouter>
                        <Login />
                </BrowserRouter>,
                div);
            ReactDOM.unmountComponentAtNode(div);
        });
    })
});