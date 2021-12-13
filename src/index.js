import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from './App';
import reportWebVitals from "./reportWebVitals";
import MainPage from "./Pages/MainPage/MainPage";
const mode = 1;
ReactDOM.render(
  <React.StrictMode>{mode ? <MainPage /> : <App />}</React.StrictMode>,
  document.getElementById("dropzone-ui-web-page")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
