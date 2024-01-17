import React from "react"
import * as ReactDOMClient from 'react-dom/client';
import App from './App'
import {BrowserRouter} from 'react-router-dom'
import './css/style.css'
import { Provider } from "react-redux";
import {store} from './store'


const app = ReactDOMClient.createRoot(document.getElementById("app"))

app.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)