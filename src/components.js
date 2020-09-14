import React from "react";
import { isEmpty } from "ramda";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Select from "@material-ui/core/Select";

export default ({ value, options, onChange, placeholder }) => {
  return (
    <FormControl style={{ marginLeft: 8 }} variant="filled">
      {isEmpty(value) && (
        <InputLabel htmlFor="outlined">{placeholder}</InputLabel>
      )}
      <Select
        multiple
        value={value}
        onChange={onChange}
        input={<OutlinedInput id="outlined" />}
        renderValue={selected => selected.join(", ")}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center"
          }
        }}
        style={{ minWidth: 180 }}
      >
        {options.map(option => (
          <MenuItem key={option} value={option}>
            <Checkbox checked={value.includes(option)} />
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
