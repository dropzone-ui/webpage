import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";

const marks = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 25,
    label: "1",
  },
  {
    value: 50,
    label: "2",
  },
  {
    value: 75,
    label: "3",
  },
  {
    value: 100,
    label: "4",
  },
];

export default function ElevationSlider(props) {
  const handleChange = (v) => {
    props.onChange?.(v);
  };
  const valuetext = (value) => {
    //console.log((value)/25,value);
    handleChange(value / 25);
    return value;
  };
  return (
    <>
      <FormLabel component="h2" style={{ marginTop: "8px" }}>{"Shadow elevation"}</FormLabel>
      <Slider
        aria-label="Always visible"
        defaultValue={0}
        getAriaValueText={valuetext}
        step={0}
        marks={marks}
        //valueLabelDisplay="on"
      />
    </>
  );
}
