import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "unset",
  },
  {
    value: 21,
    label: "10bytes",
  },
  {
    value: 44,
    label: "10KB",
  },
  {
    value: 63,
    label: "10MB",
  },
  {
    value: 81,
    label: "10GB",
  },
  {
    value: 100,
    label: "10TB",
  },
];

export default function FileSizeSlider(props) {
  const [size, setSize] = React.useState("unset");
  const handleChange = (v) => {
    switch (v) {
      case 0:
        props.onChange?.(undefined); 
        setSize("( unset )");
        break;
      case 21:
        props.onChange?.(100);
        setSize(10 + " bytes");

        break;
      case 44:
        props.onChange?.(100 * 1024);
        setSize(10 * 1024 + " bytes");
        break;
      case 63:
        props.onChange?.(100 * 1024 * 1024);
        setSize(10 * 1024 * 1024 + " bytes");

        break;
      case 81:
        props.onChange?.(100 * 1024 * 1024 * 1024);
        setSize(10 * 1024 * 1024 * 1024 + " bytes");

        break;
      case 100:
        props.onChange?.(100 * 1024 * 1024 * 1024 * 1024);
        setSize(10 * 1024 * 1024 * 1024 * 1024 + " bytes");

        break;
      default:
        props.onChange?.(undefined);
        setSize("( unset )");
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
        width: "98%",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
      }}
    >
      <FormLabel style={{ marginTop: "8px" }} component="h2">
        {`Max file ${size}`}
      </FormLabel>
      <Slider
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
