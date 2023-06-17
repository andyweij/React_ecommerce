import React from 'react';
import ReactDOM from 'react-dom/client';
import BackEndMenu from './Homework/BackEndMenu';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <BackEndMenu />
    </BrowserRouter>

)