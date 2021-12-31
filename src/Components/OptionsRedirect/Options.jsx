import React from "react";

import { Button } from "@mui/material";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import GitHubIcon from "@mui/icons-material/GitHub";
import StorageIcon from "@mui/icons-material/Storage";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import "./Options.scss";
const Options = (props) => {
  const openTab = (url) => {
    window.open(url, "_blank").focus();
  };
  return (
    <div
      className="options-container"
      // direction="row"
      /*   style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        backgroundColor: "#f3f6f9",
        margin: "20px 0px",
        width:"100%"
      }} */
    >
      <Button
        //size="small"
        variant="contained"
        style={{ margin: "5px" }}
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
        style={{ margin: "5px" }}
        //size="small"
        variant="outlined"
        startIcon={<DoubleArrowIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#Usage-and-examples")
        }
      >
        Samples
      </Button>
      <Button
        style={{ margin: "5px" }}
        //size="small"
        variant="outlined"
        startIcon={<GitHubIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#readme", "_blank")
        }
      >
        Github
      </Button>
      <Button
        style={{ margin: "5px" }}
        //size="small"
        variant="outlined"
        startIcon={<StorageIcon />}
        onClick={() =>
          openTab("https://github.com/dropzone-ui/react#uploading", "_blank")
        }
      >
        Server side
      </Button>
    </div>
  );
};
export default Options;
