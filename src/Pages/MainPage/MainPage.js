import { Grid } from "@mui/material";
import React from "react";
import Badges from "../../Components/Badges";
import Donate from "../../Components/Donate";
import ElevateAppBar from "../../Templates/ElevateAppBar";
import InteractiveCode from "../Components/InteractiveCode";
import Options from "../Components/Options";
//import ResponsiveDrawer from "../../Templates/ResponsiveDrawer";
import "./MainPage.scss";
const MainPage = (props) => {
  return (
    <div className="dui-main-wrapper">
      <div className="dui-main-paper">
        <div className="dui-main-header">
          <ElevateAppBar />
          <Grid
            container
            style={{ backgroundColor: "white", padding: "20px 0" }}
          >
            <Grid item md={4} xs={12}>
              <div className="dropzone-ui-logo-container">
                <img
                  width={"100%"}
                  src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
                  alt=" dropzone-ui main logo"
                />
              </div>{" "}
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
                width:"100%",
                padding:"10px"
              }}
            >
              <div className="dropzone-ui-text-container">
                The best and most complete library for managing  file uploads
              </div>
              <Badges />
            </Grid>
            <Grid item md={12} xs={12}>
              <div className="stargazers">
                <p style={{ fontSize: "1.5em" }}>
                  Don´t be shy and become a Dropzone-ui stargazer :D
                </p>
                <a href="https://github.com/dropzone-ui/react">
                  <img
                    src="https://img.shields.io/github/stars/dropzone-ui/react?label=Star%20me%20please%20:D&style=social"
                    alt="Build Status"
                  />
                </a>
              </div>

              <Options />
            </Grid>

            {/*   <Grid item xs={12} md={12}>
            <InteractiveDemo />
          </Grid> */}
            <Grid item xs={12} md={12} style={{ padding: "25px 15px" }}>
              <h1 id="interactive demo">Interactive code generator:</h1>
              <p style={{fontSize:"1.2em"}}>
                Below is an interactive code generator that lets you explore the
                visual results of the different settings:
              </p>
              <InteractiveCode />
            </Grid>
          </Grid>

          <Donate />
        </div>
      </div>
    </div>
  );
};
export default MainPage;
