import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InteractiveCode from "../Components/CodeGenerator/InteractiveCode";
import Api from "../Pages/Api/Api";
import DropzoneApi from "../Pages/Api/DropzoneApi";
import FileItemApi from "../Pages/Api/FileItemApi";
import Lab from "../Pages/Lab/Lab";
import MainPage from "../Pages/MainPage/MainPage";
const Main = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route path="/" element={<InteractiveCode />} />
        <Route path="/lab" element={<Lab/>} />
        <Route path="/api" element={<Api />}>
          <Route path="dropzone" element={<DropzoneApi />} />
          <Route path="fileitem" element={<FileItemApi />} />
        </Route>
        <Route path="/demo" element={<div> / demo</div>} />
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
