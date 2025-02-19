import React, { ChangeEvent } from "react";
import { TextField } from "@mui/material";

interface CustomTextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  multiline = false, 
  rows, 
  type = "text"
}) => {
  return (
    <TextField
      label={label}
      name={name}
      type={type}
      fullWidth
      multiline={multiline}
      rows={multiline ? rows : undefined}
      value={value || ""}
      onChange={onChange}
      sx={{ mb: 2 }}
      InputLabelProps={{
        shrink: type === "date" || type === "datetime-local" ? true : undefined,
      }}
    />
  );
};

export default CustomTextField;
