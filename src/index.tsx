import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import {Provider} from "react-redux";
import {store} from "./redux/store";

createRoot(document.getElementById('app')!).render(
    <Provider store={store}>
        <App/>
    </Provider>
)
