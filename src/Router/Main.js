import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../Pages/MainPage/MainPage";
const Main = (props) => {
  return (
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/code-generator" element={<MainPage/>} />
          <Route path="expenses" element={<div> / expenses</div>} />
          <Route path="invoices" element={<div> / invoices</div>} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
  );
};
export default Main;
