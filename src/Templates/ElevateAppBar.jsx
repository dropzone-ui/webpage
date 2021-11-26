import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
//import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
//import Box from "@mui/material/Box";
//import Container from "@mui/material/Container";
import { Avatar } from "@mui/material";

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export default function ElevateAppBar(props) {
 // const { children } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar
          style={{
            backgroundColor: "rgba(255,255,255,0.82)",
            color: "black",
            backdropFilter: "blur(20px)",
            boxShadow: "inset 0px -1px 1px #eaeef3",
          }}
        >
          <Toolbar>
            <Avatar
              style={{
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.replace("http://www.dropzone-ui.com");
              }}
              alt="dropzone-ui-logo"
              src="https://user-images.githubusercontent.com/43678736/132112022-0ca409ae-cca2-43c8-be89-110376260a3f.png"
            />
            <div
              style={{
                cursor: "pointer",
                margin: "0 10px",
                fontSize: "1.5rem",
                lineHeight: "1.334",
                letterSpacing: "0em",
                fontWeight: "400",
              }}
              onClick={() => {
                window.location.replace("http://www.dropzone-ui.com");
              }}
            >
              {"Dropzone-ui / react"}
            </div>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      {/*  <Container>
        <Box sx={{ my: 2 }}>
          {children ||
            [...new Array(12)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`
              )
              .join("\n")}
        </Box>
      </Container> */}
    </React.Fragment>
  );
}
