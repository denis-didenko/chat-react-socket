import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AppContextProvider } from './context/app';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
    <AppContextProvider>
        <App />
    </AppContextProvider>
);
