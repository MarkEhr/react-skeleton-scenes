import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import store from "./services/redux/store";
import {Provider} from "react-redux";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <Provider store={store} >
        <App />
    </Provider>
);

//serviceWorker.register();
