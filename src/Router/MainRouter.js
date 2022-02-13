import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InteractiveCode from "../Components/CodeGenerator/InteractiveCode";
import IconList from "../Components/Dui_IconsList/IconList";
import DuiTester from "../Components/_Tester/DuiTester";
import DuiTesterFileItem from "../Components/_Tester/DuiTesterFileItem";
import Api from "../Pages/Api/Api";
import DropzoneApi from "../Pages/Api/DropzoneApi";
import FileItemApi from "../Pages/Api/FileItemApi";
import Lab from "../Pages/Lab/Lab";
import MainPage from "../Pages/MainPage/MainPage";
import Layer from "./Layer";
const Main = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/code-generator" element={<InteractiveCode />} />
        <Route path="/dui">
          <Route path="" element={<DuiTester />} />
          <Route path="fileitem" element={<DuiTesterFileItem />} />
        </Route>
        <Route path="/image" element={<Layer />} />
        {/* <Route path="/" element={<Lab />} />
        <Route path="/icons" element={<IconList />} />
        <Route path="/api" element={<Api />}>
          <Route path="dropzone" element={<DropzoneApi />} />
          <Route path="fileitem" element={<FileItemApi />} />
        </Route>
        <Route path="/demo" element={<div> / demo</div>} /> */}
        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
              <br />
              <a href="https://duiwebpage.deelo.cloud/">return to main page</a>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default Main;
