import React from "react";
import CustomTextField from "../components/CustomTextField";
import CustomSelectField from "../components/CustomSelectField";
import { formatDateForInput } from "../utils/dateUtils";

// CustomTextField
export const renderTextField = <T,>(
    name: keyof T,
    label: string,
    type: "text" | "number" | "date" = "text",
    state: T,
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
): React.ReactNode => {
    let value = String(state[name]) || "";
    if (type === "date") {
        value = formatDateForInput(state[name] as string);
    }
    return (
        <CustomTextField label={label} name={name as string} type={type} value={value} onChange={onChange} />
    );
};

// CustomSelectField
export const renderSelectField = <T,>(
  name: keyof T,
  label: string,
  options: { label: string; value: string }[],
  state: T,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
): React.ReactNode => (
  <CustomSelectField label={label} name={name as string} value={String(state[name]) || ""} onChange={onChange} options={options} />
);
