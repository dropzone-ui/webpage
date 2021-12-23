import { Dropzone } from "@dropzone-ui/react";
import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import Badges from "../../Components/Badges";
import Donate from "../../Components/Donate";
import ElevateAppBar from "../../Templates/ElevateAppBar";
import Options from "../../Components/OptionsRedirect/Options";
//import ResponsiveDrawer from "../../Templates/ResponsiveDrawer";
import "./MainPage.scss";
const MainPage = (props) => {
  return (
    <Fragment>
      {/* <Dropzone /> */}

      <div className="dui-main-wrapper">
        {" "}
        <ElevateAppBar />
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

            <Donate />
          </div>
        </div> 
      </div>
    </Fragment>
  );
};
export default MainPage;
