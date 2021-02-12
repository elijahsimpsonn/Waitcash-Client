import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Tips from '../routes/Tips/Tips'

describe(`ConsolePage Component`, () => {
    describe(`Smoke test`, () => {
        it(`Renders without crashing`, () => {
            const div = document.createElement('div');
            ReactDOM.render(
                <BrowserRouter>
                        <Tips />
                </BrowserRouter>,
                div);
            ReactDOM.unmountComponentAtNode(div);
        });
    })
});