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
import { Highlighter } from "@unlimited-react-components/react-highlight";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { Dropzone, FileItem, FullScreenPreview } from "../../dropzone-ui";
import "./InteractiveCode.scss";
import InteractiveGeneratedCode from "./InteractiveGeneratedCode";

const InteractiveCode = (props) => {
  //props
  const [viewMode, setViewMode] = useState("list");
  const handleChangeView = (value) => {
    setViewMode(value);
  };

  const [color, setColor] = useState("#071e25");
  const handleChangeColor = (e) => {
    setColor(e.target.value);
  };
  const [maxSize, setmaxSize] = useState(29300000);
  const handleChangeMaxSize = (e) => {
    setmaxSize(e.target.value);
  };
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
  //view
  const [viewValue, setViewValue] = React.useState("unset");
  const handleCheckView = (e, val) => {
    setViewValue(val);
  };
  const [footerDis, setFooterDis] = React.useState(false);
  const [headerDis, setHeaderDis] = React.useState(false);
  ////       ////       ////       ////       FILE ITEM
  const [hd, setHd] = React.useState(false);
  const [info, setInfo] = React.useState(false);
  const [preview, setPreview] = React.useState(false);
  const [alwaysActive, setAlwaysActive] = React.useState(false);
  const [onSee, setOnSee] = React.useState(false);
  const [onDeleteVal, setOnDelete] = React.useState(false);
  return (
    <div className="dui-demo-container">
      <Dropzone
        style={{ margin: "15px 0" }}
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
          />
        ))}
        <FullScreenPreview
          imgSource={imageSrc}
          openImage={imageSrc}
          onClose={(e) => handleSee(undefined)}
        />
      </Dropzone>
      <Paper elevation={3} style={{ margin: "15px 0", padding: "15px" }}>
        <Grid container>
          <Grid item md={4} xs={12} spacing={2}>
            <FormLabel component="legend">Accept</FormLabel>
            <TextField
              id="outlined-basic"
              size="small"
              //label="Outlined"
              variant="outlined"
              onChange={handleChangeAccept}
              value={accept}
            />
            <FormLabel component="legend">minHeight</FormLabel>
            <TextField
              id="outlined-basic"
              size="small"
              //label="Outlined"
              variant="outlined"
              onChange={handleMinHeight}
              value={minHeight}
            />
            <FormLabel component="legend">Localization</FormLabel>

            <Autocomplete
              //disablePortal
              autoSelect
              size="small"
              style={{ width: "80%" }}
              //fullWidth
              onChange={hadleSelect}
              id="combo-box-demo"
              options={languages}
              getOptionLabel={(option) => option.idiom}
              renderInput={(params) => (
                <TextField {...params} label="Localization" />
              )}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">View (FileItems layout)</FormLabel>
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
          <Grid
            item
            md={4}
            xs={12}
            style={{ paddingLeft: "10px", borderLeft: "1px solid grey" }}
          >
            <FormLabel component="h2"> FileItem props </FormLabel>
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
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setPreview(ch);
                  }}
                />
              }
              label="preview"
            />
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
            <FormControlLabel
              control={
                <Switch
                  onChange={(e, ch) => {
                    setOnDelete(ch);
                  }}
                />
              }
              label="onDelete"
            />
          </Grid>
        </Grid>
      </Paper>

      <InteractiveGeneratedCode
        {...{
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
