import React from "react";
import "./Footer.scss";
const Footer = (props) => {
  return (
    <footer className="dui-footer">
      <div className="dui-footer-logo-container">
        <img
          width={"90%"}
          height={"90%"}
          alt="dui-footer-logo"
          src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
        />
      </div>
      <div className="dui-footer-logo-text">
        {"Copyright © 2021 Dropzone-UI"}
      </div>
    </footer>
  );
};
export default Footer;
