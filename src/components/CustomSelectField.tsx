import React from "react";
import { TextField, MenuItem } from "@mui/material";

interface CustomSelectFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  options: { label: string; value: string }[];
}

const CustomSelectField: React.FC<CustomSelectFieldProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options
}) => {
  const handleSelectChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const nameValue = event.target.name || name;
    const selectedValue = event.target.value as string;

    // Creamos un `ChangeEvent<HTMLInputElement>` manualmente
    const syntheticEvent = {
      target: { name: nameValue, value: selectedValue },
    } as React.ChangeEvent<HTMLInputElement>;

    onChange(syntheticEvent);
  };

  return (
    <TextField
      select
      label={label}
      name={name}
      fullWidth
      value={value || ""}
      onChange={handleSelectChange}
      sx={{ mb: 2 }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default CustomSelectField;
