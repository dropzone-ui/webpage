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
            <Grid item xs={12} md={12} style={{ padding: "24px 15px" }}>
              <h1 id="interactive demo">Interactive code generator:</h1>
              <p style={{ fontSize: "1.2em" }}>
                Below is an interactive code generator that lets you explore the
                visual results of the different settings.
              </p>
              <p style={{ fontSize: "1.1em" ,marginBottom:"10px"}}>
                Basic config is already set. Play with the options, drop (or select) files, copy to
                clipboard the code and you are done!
              </p>
              <p style={{ fontSize: "1.1em" ,marginBottom:"5px"}}>
                For a plenty understanding of props and methods please check them out on the <a href="https://github.com/dropzone-ui/react#dropzone-ui-react-components-api">documentation</a>.
              </p>
              <p style={{ fontSize: "0.9em" ,marginBottom:"10px", width:"100%", backgroundColor:"#fbec99"}}>
                <b>Note: </b> Dropzone-ui.com is on beta. You may experience some performance issues in this code generator. However, it does not mean  that Dropzone-ui components have that issue in production. This is because of the huge amount of events happening inside to generate the code. Any aditional issues or suggestions, please make us notice on <a href="https://github.com/dropzone-ui/react/issues">github issues</a>:
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
