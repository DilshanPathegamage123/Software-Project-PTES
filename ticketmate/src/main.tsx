
<!-- import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root");
if (root !== null) {
  ReactDOM.createRoot(root).render(
    <BrowserRouter> -->

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './index.css';
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.render(
    <React.StrictMode>

      <App />
    </BrowserRouter>
  );
}
