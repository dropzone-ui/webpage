import { Grid } from "@mui/material";
import React from "react";
import Badges from "../../Components/Badges";
import ElevateAppBar from "../../Templates/ElevateAppBar";
import InteractiveDemo from "../Components/InteractiveDemo";
//import ResponsiveDrawer from "../../Templates/ResponsiveDrawer";
import "./MainPage.scss";
const MainPage = (props) => {
  return (
    <div className="dui-main-wrapper">
      <div className="dui-main-header">
        <ElevateAppBar />
        <Grid container style={{ backgroundColor: "white", padding: "10px 0" }}>
          <Grid item md={3} xs={12}>
            <div className="dropzone-ui-logo-container">
              <img
                width={"100%"}
                src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
                alt=" dropzone-ui main logo"
              />
            </div>
          </Grid>
          <Grid item md={9} xs={12} className="dropzone-ui-text-container">
            <div className="dropzone-ui-text-container">
              The most complete file upload library
            </div>
            <Badges />
          </Grid>
          <Grid item xs={12} md={12}>
            <InteractiveDemo />
          </Grid>
        </Grid>
        <div className="dui-main-wrapper-body">bolaaa</div>
      </div>
    </div>
  );
};
export default MainPage;
