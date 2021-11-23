import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
const ViewRadioOptions = (props) => {
  const { onChange, value } = props;
  //const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    //setValue(event.target.value);
    onChange?.(event.target.value);
  };
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">View</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="grid" control={<Radio />} label="Grid" />
        <FormControlLabel value="list" control={<Radio />} label="List" />
        <FormControlLabel value={"none"} control={<Radio />} label="None" />
      </RadioGroup>
    </FormControl>
  );
};
export default ViewRadioOptions;
