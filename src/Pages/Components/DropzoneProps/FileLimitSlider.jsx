import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "unset",
  },
  {
    value: 25,
    label: "14 files",
  },
  {
    value: 50,
    label: "28 files",
  },
  {
    value: 75,
    label: "56 files",
  },
  {
    value: 100,
    label: "72 files",
  },
];

export default function FileLimitSlider(props) {
  const [maxFiles, setMaxFiles] = React.useState("unset");

  const handleChange = (v) => {
    switch (v) {
      case 0:
        props.onChange?.(undefined);
        setMaxFiles("( unset )");
        break;
      case 25:
        props.onChange?.(14);
        setMaxFiles(14);

        break;
      case 50:
        props.onChange?.(28);
        setMaxFiles(28);
        break;
      case 75:
        props.onChange?.(56);
        setMaxFiles(56);

        break;

      case 100:
        props.onChange?.(72);
        setMaxFiles(72);

        break;
      default:
        props.onChange?.(undefined);
        setMaxFiles("( unset )");
        break;
    }
  };
  const valuetext = (value) => {
    //console.log((value)/25,value);
    handleChange(value);
    //return value;
  };
  return (
    <div
      style={{
        width: "95%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <FormLabel style={{ marginTop: "8px" }} component="h2">
        {"Max amount of files: " + maxFiles}
      </FormLabel>
      <Slider
        // style={{ margin: "8px" }}
        aria-label="Always visible"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={0}
        marks={marks}
        //valueLabelDisplay="on"
      />
    </div>
  );
}
