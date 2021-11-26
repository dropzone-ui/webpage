import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dropzone, FileItem, FullScreenPreview } from "../../dropzone-ui";
import "./InteractiveCode.scss";
import InteractiveGeneratedCode from "./InteractiveGeneratedCode";
import ElevationSlider from "./FileItemProps/ElevationSlider";
import FileSizeSlider from "./DropzoneProps/FileSizeSlider";
import FileLimitSlider from "./DropzoneProps/FileLimitSlider";

const InteractiveCode = (props) => {
  ////////////////////     DROPZONE PROPS ////////////////
  //color
  const [useColor, setUseColor] = useState(undefined);
  const [color, setColor] = useState("#071e25");
  useEffect(() => {
    if (!useColor) {
      setColor(undefined);
    } else {
      if (!color) {
        setColor("#071e25");
      }
    }
  }, [useColor, color]);

  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  //maxFileSise
  const [maxFileSize, setmaxFileSize] = useState(29300000);
  const handleChangeMaxFileSize = (v) => {
    setmaxFileSize(v);
    // setmaxSize(e.target.value);
  };
  //maxFiles
  const [maxFiles, setMaxFiles] = useState(29300000);
  const handleChangeMaxFiles = (v) => {
    setMaxFiles(v);
    // setmaxSize(e.target.value);
  };
  //label
  const [label, setLabel] = useState("Drop Files here or click to browse");
  const handleChangeLabel = (e) => {
    if (e.target.value.lenght === 0) {
      setLabel(undefined);
    } else setLabel(e.target.value);
  };
  //display
  const [files, setFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };
  const handleDelete = (id) => {
    setFiles(files.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  //localization
  const [localization, setLocalization] = useState(undefined);
  const hadleSelect = (e, value) => {
    console.log(value);
    setLocalization(value?.value);
  };
  //accept
  const [accept, setAccept] = useState("image/jpeg,.ts");
  const handleChangeAccept = (e) => {
    if (e.target.value.lenght === 0) {
      setAccept(undefined);
    } else setAccept(e.target.value);
  };
  //minHeight
  const [minHeight, setMinHeight] = useState("195px");
  const handleMinHeight = (e) => {
    if (e.target.value.lenght === 0) {
      setMinHeight(undefined);
    } else setMinHeight(e.target.value);
  };
  //maxHeight
  const [maxHeight, setMaxHeight] = useState("500px");
  const handleMaxHeight = (e) => {
    if (e.target.value.lenght === 0) {
      setMaxHeight(undefined);
    } else setMaxHeight(e.target.value);
  };
  //view
  const [viewValue, setViewValue] = React.useState("unset");
  const handleCheckView = (e, val) => {
    setViewValue(val);
  };
  const [footerDis, setFooterDis] = React.useState(false);
  const [headerDis, setHeaderDis] = React.useState(false);
  const [clickable, setClickable] = React.useState(true);
  const [onClean, setOnClean] = React.useState(true);
  const [uploadOnDrop, setUploadOnDrop] = React.useState(false);
  //inner Upload

  //const [innerUpload, setInnerUpload] = useState(false);
  const [url, setUrl] = React.useState(undefined);
  const [method, setMethod] = React.useState("POST");
  const [fakeupload, setFakeUpload] = React.useState(false);
  //const [headerDis, setHeaderDis] = React.useState(false);

  //config
  ////       ////       ////       ////       FILE ITEM
  const [hd, setHd] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [alwaysActive, setAlwaysActive] = React.useState(false);
  const [onSee, setOnSee] = React.useState(false);
  const [onDeleteVal, setOnDelete] = React.useState(false);
  const [elevation, setElevation] = React.useState(0);
  return (
    <div className="dui-demo-container">
      <Dropzone
        //style={{ fontFamily:`"Roboto","Helvetica","Arial",sans-serif` }}
        label={label}
        color={color}
        minHeight={minHeight}
        accept={accept}
        view={viewValue === "unset" ? undefined : viewValue}
        localization={localization}
        onChange={updateFiles}
        value={files}
        url="dcsdvdsv"
        fakeUploading
        footer={footerDis ? false : true}
        header={headerDis ? false : true}
        clickable={clickable || undefined}
        onClean={onClean || undefined}
        uploadOnDrop={uploadOnDrop || undefined}
        maxFileSize={maxFileSize}
        maxFiles={maxFiles}
        config={config}
      >
        {files.map((file) => (
          <FileItem
            {...file}
            key={file.id}
            onDelete={onDeleteVal ? handleDelete : undefined}
            onSee={onSee ? handleSee : undefined}
            localization={localization}
            alwaysActive={alwaysActive || undefined}
            preview={preview ? preview : undefined}
            //onlyImage
            info={info ? info : undefined}
            hd={hd ? hd : undefined}
            elevation={elevation}
            
          />
        ))}
        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
        />
      </Dropzone>
      {/**
       * /////////////////////////////    CONTROLS    ////////////////////////////////////
       */}
      <Grid container style={{ padding: "15px 0" }} spacing={2}>
        <Grid item md={8} xs={12}>
          <h3>Dropzone props</h3>
          <Paper elevation={3} style={{ padding: "15px" }}>
            <Grid container spacing={4}>
              <Grid item md={6} xs={12}>
                <h4 style={{ margin: "10px 5px 0 0" }}>Validation</h4>
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Accept
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  //label="Outlined"
                  variant="outlined"
                  onChange={handleChangeAccept}
                  value={accept}
                />
                <FileSizeSlider onChange={handleChangeMaxFileSize} />
                <FileLimitSlider onChange={handleChangeMaxFiles} />
                <h4 style={{ margin: "10px 5px 0 0" }}>Language</h4>
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Localization
                </FormLabel>
                <Autocomplete
                  //disablePortal
                  autoSelect
                  size="small"
                  //style={{ width: "80%" }}
                  //fullWidth
                  onChange={hadleSelect}
                  id="combo-box-demo"
                  options={languages}
                  getOptionLabel={(option) => option.idiom}
                  renderInput={(params) => (
                    <TextField {...params} label="Localization" />
                  )}
                />{" "}
                <h4 style={{ margin: "10px 5px 0 0" }}>Upload process</h4>
                <FormLabel component="h2" style={{ marginTop: "8px" }}>
                  Start upload on drop
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, ch) => {
                        setUploadOnDrop(ch);
                      }}
                    />
                  }
                  label="uploadOnDrop"
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Url of server
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  label="url"
                  variant="outlined"
                  //onChange={handleChangeAccept}
                  //value={accept}
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Method (POST by default)
                </FormLabel>
                <Autocomplete
                  //disablePortal
                  autoSelect
                  size="small"
                  //style={{ width: "80%" }}
                  //fullWidth
                  //onChange={hadleSelect}
                  id="combo-box-demo"
                  options={[
                    { method: "POST" },
                    { method: "PATCH" },
                    { method: "PUT" },
                  ]}
                  getOptionLabel={(option) => option.method}
                  renderInput={(params) => (
                    <TextField {...params} label="method" />
                  )}
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Aditional configuration
                </FormLabel>
                <TextField
                  id="outlined-multiline-flexible"
                  label="Multiline"
                  multiline
                  fullWidth
                  maxRows={6}
                  minRows={3}
                  // value={value}
                  //onChange={handleChange}
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Uploading Message
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  label="uploadingMessage"
                  variant="outlined"
                  //onChange={handleChangeAccept}
                  //value={accept}
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <h4 style={{ margin: "10px 5px 0 0" }}>Display settings</h4>
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  Custom Label
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  //label="Outlined"
                  variant="outlined"
                  onChange={handleChangeLabel}
                  value={label}
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  minHeight
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  //label="Outlined"
                  variant="outlined"
                  onChange={handleMinHeight}
                  value={minHeight}
                />
                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  maxHeight
                </FormLabel>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  size="small"
                  //label="Outlined"
                  variant="outlined"
                  onChange={handleMaxHeight}
                  value={maxHeight}
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend" style={{ marginTop: "8px" }}>
                    View (FileItems layout)
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    onChange={handleCheckView}
                    value={viewValue}
                  >
                    <FormControlLabel
                      value="list"
                      control={<Radio />}
                      label="list"
                    />
                    <FormControlLabel
                      value="grid"
                      control={<Radio />}
                      label="grid"
                    />
                    <FormControlLabel
                      value={"unset"}
                      control={<Radio />}
                      label="unset"
                    />
                  </RadioGroup>
                </FormControl>

                <FormLabel component="legend" style={{ marginTop: "8px" }}>
                  {`Theme color: ( ${useColor ? color : "unset"} )`}
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useColor}
                      onChange={(e, ch) => {
                        setUseColor(ch);
                      }}
                    />
                  }
                  label={useColor ? "disable color" : "enable color"}
                />
                {useColor && (
                  <div>
                    <input
                      placeholder="color"
                      onChange={handleChangeColor}
                      //value={color}
                      type="color"
                    />
                    {color}{" "}
                  </div>
                )}
                <FormLabel component="h2" style={{ marginTop: "8px" }}>
                  Clean not valid files button
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={onClean}
                      onChange={(e, ch) => {
                        setOnClean(ch);
                      }}
                    />
                  }
                  label="onClean"
                />
                <FormLabel component="h2" style={{ marginTop: "8px" }}>
                  Enable/disable clickable
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      checked={clickable}
                      onChange={(e, ch) => {
                        setClickable(ch);
                      }}
                    />
                  }
                  label="clickable"
                />

                <FormLabel component="h2">
                  {" "}
                  Footer and header (true by def.){" "}
                </FormLabel>
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, ch) => {
                        setHeaderDis(ch);
                      }}
                    />
                  }
                  label="disable header"
                />
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(e, ch) => {
                        setFooterDis(ch);
                      }}
                    />
                  }
                  label="disable footer"
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item md={4} xs={12}>
          <h3>FileItem props</h3>
          <Paper elevation={3} style={{ padding: "15px" }}>
            <h4 style={{ margin: "10px 5px 0 0" }}>Display</h4>
            <FormLabel component="h2" style={{ marginTop: "8px" }}>
              {" "}
              Show info layer{" "}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setInfo(ch);
                  }}
                />
              }
              label="info"
            />
            <FormLabel component="h2" style={{ marginTop: "8px" }}>
              {" "}
              Always active (only on Hover if false){" "}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setAlwaysActive(ch);
                  }}
                />
              }
              label="alwaysActive"
            />
            <h4 style={{ margin: "10px 5px 0 0" }}>
              Preview (inside and fullscreen)
            </h4>
            <FormLabel component="legend" style={{ marginTop: "8px" }}>
              {" "}
              Show image preview on FleItem if valid
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setPreview(ch);
                  }}
                />
              }
              label="preview"
            />{" "}
            <FormLabel component="h2" style={{ marginTop: "8px" }}>
              {" "}
              Show preview in HD{" "}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setHd(ch);
                  }}
                />
              }
              label="hd"
            />
            <FormLabel component="legend" style={{ marginTop: "8px" }}>
              {" "}
              Show FullScreen preview button and add handler{" "}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setOnSee(ch);
                  }}
                />
              }
              label="onSee"
            />
            <h4 style={{ margin: "10px 5px 0 0" }}>Delete File</h4>
            <FormLabel component="legend" style={{ marginTop: "8px" }}>
              {" "}
              Show "delete file" button and add handler{" "}
            </FormLabel>
            <FormControlLabel
              control={
                <Switch
                  value={onDeleteVal}
                  onChange={(e, ch) => {
                    setOnDelete(ch);
                  }}
                />
              }
              label="onDelete"
            />{" "}
            <ElevationSlider onChange={(v) => setElevation(v)} />
          </Paper>
        </Grid>
      </Grid>

      <InteractiveGeneratedCode
        {...{
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
        }}
      />
    </div>
  );
};
export default InteractiveCode;

const languages = [
  { idiom: "Español: ES-es", value: "ES-es" },
  { idiom: "English: EN-en", value: "EN-en" },
  { idiom: "French: FR-fr", value: "FR-fr" },
  { idiom: "Portuguese: PT-pt", value: "PT-pt" },
  { idiom: "Russian: RU-ru", value: "RU-ru" },
  { idiom: "Chinese(simplified): ZH-cn", value: "ZH-cn" },
  { idiom: "Chinese(traditional): ZH-hk", value: "ZH-hk" },
];
