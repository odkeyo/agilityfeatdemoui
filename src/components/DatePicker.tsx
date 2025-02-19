import React from "react";
import { TextField } from "@mui/material";

interface DatePickerProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, name, value, onChange }) => {
  return (
    <TextField
      label={label}
      name={name}
      type="datetime-local"
      fullWidth
      value={value}
      onChange={onChange}
      sx={{ mb: 2 }}
    />
  );
};

export default DatePicker;
