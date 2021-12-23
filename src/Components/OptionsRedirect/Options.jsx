import React from "react";

import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
const Options = (props) => {
  const openTab = (url) => {
    window.open(url, "_blank").focus();
  };
  return (
    <div
      direction="row"
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        backgroundColor: "#f3f6f9",
        padding: "25px 5px",
      }}
    >
      <Button
        size="small"
        variant="contained"
        startIcon={<DocumentScannerIcon />}
        onClick={() =>
          openTab(
            "https://github.com/dropzone-ui/react#dropzone-ui-react-components-api"
          )
        }
      >
        API doc
      </Button>
      <Button
        size="small"
        variant="outlined"
        startIcon={<DoubleArrowIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#Usage-and-examples")
        }
      >
        Samples
      </Button>
      <Button
        size="small"
        variant="outlined"
        startIcon={<GitHubIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#readme", "_blank")
        }
      >
        Github
      </Button>
      <Button
        size="small"
        variant="outlined"
        startIcon={<StorageIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#uploading", "_blank")
        }
      >
        Server side
      </Button>
      {/*  <div id="donate-button-container">
        <div id="donate-button"></div>
      </div> */}
    </div>
  );
};
export default Options;