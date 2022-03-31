import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import MainPage from "./Pages/MainPage/MainPage";
import { BrowserRouter } from "react-router-dom";
import Main from "./Router/MainRouter";
import { DropzoneUI, Dropzone, FileItem } from "./dropzone-ui";
import { FileItemObject } from "./dropzone-ui/utils/file-validation/validation.types";
import FITester from "./FITester";
const mode = 1;

ReactDOM.render(
  <React.StrictMode>
    {/*  <BrowserRouter>{mode ? <MainPage /> : <App />}</BrowserRouter> */}
    {/*     <Main /> */}
    <FITester />
  </React.StrictMode>,
  document.getElementById("dropzone-ui-web-page")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
