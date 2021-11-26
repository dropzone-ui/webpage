//import { Highlighter } from "@unlimited-react-components/react-highlight";
import { Highlighter } from "@unlimited-react-components/react-highlight";
import React, { Fragment, useEffect, useState } from "react";
//import { Highlighter } from "../../HIGHLIGHTER";

const InteractiveGeneratedCode = (props) => {
  const {
    accept,
    maxHeight,
    localization,
    minHeight,
    hd,
    info,
    preview,
    alwaysActive,
    onSee,
    onDeleteVal,
    viewValue,
    footerDis,
    headerDis,
    elevation,
    url,
    method,
    behaviour,
    uploadingMessage,
    config,
    uploadOnDrop,
    fakeupload,
    label,
    maxFileSize,
    maxFiles,
    onClean,
  } = props;
  const [code, setCode] = useState("");
  const makeAccept = (accept) => {
    if (!accept || accept.length === 0) {
      return ``;
    }
    return `\n\taccept={"${accept}"}\n`;
  };
  const makeLocalization = (localization, item) => {
    if (!localization || localization.length === 0) {
      return ``;
    }
    if (item) {
      return `\n\t    localization={"${localization}"}\n`;
    }
    return `\n\tlocalization={"${localization}"}\n`;
  };
  const makeMinHeight = (minHeight) => {
    if (!minHeight || minHeight.length === 0) {
      return ``;
    }
    return `\n\tminHeight={"${minHeight}"}\n`;
  };
  const makeMaxHeight = (maxHeight) => {
    if (!maxHeight || maxHeight.length === 0) {
      return ``;
    }
    return `\n\tmaxHeight={"${maxHeight}"}\n`;
  };
  const makeView = (viewValue) => {
    if (viewValue === "unset") {
      return ``;
    }
    return `\n\tviewValue={"${viewValue}"}\n`;
  };
  const makeFooter = (footerDis) => {
    if (!footerDis) {
      return ``;
    }
    return `\n\tfooter={${!footerDis}}\n`;
  };
  const makeHeader = (headerDis) => {
    if (!headerDis) {
      return ``;
    }
    return `\n\theader={${!headerDis}}\n`;
  };
  function makeUrl(url) {
    if (!url) {
      return ``;
    }
    return `\n\turl={"${url}"}\n`;
  }
  function makeMethod(method) {
    if (!method) {
      return ``;
    }
    return `\n\tmethod={"${method}"}\n`;
  }
  function makeBehaviour(behaviour) {
    if (behaviour === "unset") {
      return ``;
    }
    return `\n\tbehaviour={"${behaviour}"}\n`;
  }
  function makeUploadingMessage(uploadingMessage) {
    if (!uploadingMessage) {
      return ``;
    }
    return `\n\tuploadingMessage={"${uploadingMessage}"}\n`;
  }
  function makeConfig(config) {
    if (!config) {
      return ``;
    }
    return `\n\tconfig={${config}}\n`;
  }

  function makeUploadOnDrop(uploadOnDrop) {
    if (!uploadOnDrop) {
      return ``;
    }
    return `\n\tuploadOnDrop\n`;
  }
  function makeFakeUpload(fakeupload) {
    if (!fakeupload) {
      return ``;
    }
    return `\n\tfakeupload\n`;
  }
  function makeLabel(label) {
    if (!label) {
      return ``;
    }
    return `\n\tlabel={"${label}"}\n`;
  }
  function makeMaxFileSize(maxFileSize) {
    if (!maxFileSize) {
      return ``;
    }
    return `\n\tmaxFileSize={${maxFileSize}}\n`;
  }
  function makeMaxFiles(maxFiles) {
    if (!maxFiles) {
      return ``;
    }
    return `\n\tmaxFiles={${maxFiles}}\n`;
  }
  function makeonClean(onClean) {
    if (!onClean) {
      return ``;
    }
    return `\n\tonClean\n`;
  }
  ////////////////// FILE ITEM
  function makeHd(hd) {
    if (hd) {
      return `\n\t    hd\n`;
    } else {
      return ``;
    }
  }
  function makePreview(preview) {
    if (preview) {
      return `\n\t    preview\n`;
    } else {
      return ``;
    }
  }
  function makeInfo(info) {
    if (info) {
      return `\n\t    info\n`;
    } else {
      return ``;
    }
  }
  function makeAlwaysActive(alwaysActive) {
    if (alwaysActive) {
      return `\n\t    alwaysActive\n`;
    } else {
      return ``;
    }
  }
  function makeOnSee(onSee) {
    if (onSee) {
      return `\n\t    onSee={handleSee}\n`;
    } else {
      return ``;
    }
  }
  function makeOnDelete(onDeleteVal) {
    if (onDeleteVal) {
      return `\n\t    onDelete={handleDelete}\n`;
    } else {
      return ``;
    }
  }
  const makeElevation = (elevation) => {
    if (!elevation || elevation === 0) {
      return ``;
    } else {
      return `\n\t    elevation={${elevation}}\n`;
    }
  };
  //////// MAIN CODE
  const makeCode = (
    accept,
    maxHeight,
    localization,
    minHeight,
    hd,
    info,
    preview,
    alwaysActive,
    onSee,
    onDeleteVal,
    viewValue,
    footerDis,
    headerDis,
    elevation,
    url,
    method,
    behaviour,
    uploadingMessage,
    config,
    uploadOnDrop,
    fakeupload,
    label,
    maxFileSize,
    maxFiles,
    onClean
  ) => {
    return (
      `
      <Dropzone
        onChange={updateFiles}
        value={files}` +
      makeAccept(accept) +
      makeMinHeight(minHeight) +
      makeMaxHeight(maxHeight) +
      makeLocalization(localization) +
      makeView(viewValue) +
      makeFooter(footerDis) +
      makeHeader(headerDis) +
      makeUrl(url) +
      makeMethod(method) +
      makeUploadingMessage(uploadingMessage) +
      makeBehaviour(behaviour) +
      makeConfig(config) +
      makeUploadOnDrop(uploadOnDrop) +
      makeFakeUpload(fakeupload) +
      makeLabel(label) +
      makeMaxFileSize(maxFileSize)+
      makeMaxFiles(maxFiles)+
      makeonClean(onClean)+
      `
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}` +
      makeOnDelete(onDeleteVal) +
      makeOnSee(onSee) +
      makeAlwaysActive(alwaysActive) +
      makeLocalization(localization, true) +
      makePreview(preview) +
      makeInfo(info) +
      makeHd(hd) +
      makeElevation(elevation) +
      `
          />
        ))}
      </Dropzone>
      `
    );
  };
  useEffect(() => {
    const codeGenerated = makeCode(
      accept,
      maxHeight,
      localization,
      minHeight,
      hd,
      info,
      preview,
      alwaysActive,
      onSee,
      onDeleteVal,
      viewValue,
      footerDis,
      headerDis,
      elevation,
      url,
      method,
      behaviour,
      uploadingMessage,
      config,
      uploadOnDrop,
      fakeupload,
      label,
      maxFileSize,
      maxFiles,
      onClean
    );
    setCode(codeGenerated);
    // eslint-disable-next-line
  }, [
    accept,
    maxHeight,
    localization,
    minHeight,
    hd,
    info,
    preview,
    alwaysActive,
    onSee,
    onDeleteVal,
    viewValue,
    footerDis,
    headerDis,
    elevation,
    url,
    method,
    behaviour,
    uploadingMessage,
    config,
    uploadOnDrop,
    fakeupload,
    label,
    maxFileSize,
    maxFiles,
    onClean,
  ]);
  return (
    <Fragment>
      <Highlighter
        style={{ margin: "10px 0", backgroundColor: "#010409" }}
        onCopyToClipboard={(code_) => {
          console.log("copied: " + code_);
        }}
      >
        {code}
      </Highlighter>
    </Fragment>
  );
};
export default InteractiveGeneratedCode;
/*
const makeCode2 = `
    // this is a sample code
    import React from "react";
    
    const themes = {
      light: {
        foreground: "#000000",
        background: "#eeeeee"
      },
      dark: {
        foreground: "#ffffff",
        background: "#222222"
      }
    };
    
    const ThemeContext = React.createContext( themes.light );
    
    function App() {
      return (
        <ThemeContext.Provider value={ themes.dark }>
          <Toolbar />
        </ThemeContext.Provider>
      );
    }
    
    function Toolbar(props) {
      return (
        <div>
          <ThemedButton />
        </div>
      );
    }
    
    const ThemedButton =() => {
      const theme = useContext(ThemeContext);  
      return (    
        <button style=
        {{ background: theme.background, 
            color: theme.foreground }}
        >      
         { "I am styled by theme context! " }  
        </button>  
      );
    } 
`;
*/
