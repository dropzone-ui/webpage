//import { Highlighter } from "@unlimited-react-components/react-highlight";
import { Highlighter } from "@unlimited-react-components/react-highlight";
import React, { Fragment, useEffect, useState } from "react";
//import { Highlighter } from "../../HIGHLIGHTER";

const InteractiveGeneratedCode = (props) => {
  const {
    accept,
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
  } = props;
  const [code, setCode] = useState("");
  const makeAccept = (accept) => {
    if (!accept || accept.length === 0) {
      return ``;
    }
    return `\n\taccept={"${accept}"}\n`;
  };
  const makeLocalization = (localization) => {
    if (!localization || localization.length === 0) {
      return ``;
    }
    return `\n\tlocalization={"${localization}"}\n`;
  };
  const makeMinHeight = (minHeight) => {
    if (!minHeight || minHeight.length === 0) {
      return ``;
    }
    return `\n\tminHeight={"${minHeight}"}\n`;
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
  const makeCode = (
    accept,
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
    headerDis
  ) => {
    return (
      `
      <Dropzone` +
      makeAccept(accept) +
      makeMinHeight(minHeight) +
      makeLocalization(localization) +
      makeView(viewValue) +
      makeFooter(footerDis) +
      makeHeader(headerDis) +
      `
        onChange={updateFiles}
        value={files}
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}` +
      makeOnDelete(onDeleteVal) +
      makeOnSee(onSee) +
      makeAlwaysActive(alwaysActive) +
      makeLocalization(localization) +
      makePreview(preview) +
      makeInfo(info) +
      makeHd(hd) +
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
      headerDis
    );
    setCode(codeGenerated);
  }, [
    accept,
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
