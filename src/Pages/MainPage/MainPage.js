
import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import Badges from "../../Components/Badges";
import Donate from "../../Components/Donate";
import ElevateAppBar from "../../Templates/ElevateAppBar";
import Options from "../../Components/OptionsRedirect/Options";
//import ResponsiveDrawer from "../../Templates/ResponsiveDrawer";
//import "./MainPage.scss";
import "./MainStyles.scss";
import InteractiveCode from "../../Components/CodeGenerator/InteractiveCode";
import RightPart from "./MainPageRightDropzone/RightPart";
import LeftPart from "./MainPageLeftDropzone/LeftPart";
import Footer from "../Footer/Footer";
const MainPage = (props) => {
  return (
    <Fragment>
      <Fragment>
        {/* 

      <div className="dui-main-wrapper">
        {" "}
        <ElevateAppBar />
        <div className="dui-main-paper">
          <div className="dui-main-header">
           
            <Grid
              container
              style={{ backgroundColor: "white", padding: "20px 0" }}
            >
              <Grid item md={4} xs={12}>
                <div className="dropzone-ui-logo-container">
                  <img
                    width={"100%"}
                    src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
                    alt="dropzone-ui main logo"
                  />
                </div>
                <div className="dropzone-ui-logo-text">Dropzone-ui</div>
              </Grid>
              <Grid
                item
                md={8}
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  width: "100%",
                  padding: "10px",
                }}
              >
                <div className="dropzone-ui-text-container">
                  The best and most complete library for managing file uploads
                </div>
                <Badges />
              </Grid>
              <Grid item md={12} xs={12}>
                <Options />
              </Grid>
            </Grid>
            <InteractiveCode />
            <Donate />
          </div>
        </div>
      </div> */}
      </Fragment>
      <Fragment>
        <div className="dui-web-main-wrapper">
          <ElevateAppBar />
          <div className="dui-web-main-container">
            <div className="dui-web-main-container-left">
              <div className="dropzone-ui-logo-container">
                <img
                  width={"100%"}
                  src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
                  alt="dropzone-ui main logo"
                />
              </div>
              <div className="dropzone-ui-logo-text">
                Dropzone <span>UI</span>
              </div>
              <LeftPart />
            </div>
            <div className="dui-web-main-container-right">
              <RightPart />
              
            </div>
          </div>{" "}
          <Footer />
          {/* holaa */}
        </div>
      </Fragment>
    </Fragment>
  );
};
export default MainPage;
