import React, { useState } from "react";
import { FormControl, TextField, IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { fieldProps } from "@/data/material-ui/input-field";
import { MuiInputChangeEvent, MuiInputProps } from "@/types/mui-input";

export default function MuiInput(props: MuiInputProps) {
  const { value, label, onChange, key, type, placeholder, required } = props;

  const { input, inputProps } = fieldProps({
    value,
  });

  const [visiblity, setVisiblity] = useState(false);
  const [focused, setFocused] = useState(false);

  const Icon = visiblity ? VisibilityOffOutlined : VisibilityOutlined;

  function handlePasswordSeen() {
    setVisiblity(true);
    setTimeout(() => setVisiblity(false), 800);
  }

  function passwordIcon() {
    return (
      <IconButton onClick={handlePasswordSeen} sx={{ padding: 0 }}>
        <Icon sx={{ color: "gray" }} />
      </IconButton>
    );
  }

  function handleInput(
    e: MuiInputChangeEvent
  ) {
    const { value } = e.target;

    // if(onChange) onChange(value);
  }

  return (
    <FormControl fullWidth>
      <TextField
        sx={input}
        key={key || ""}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={value}
        variant="outlined"
        autoComplete="off"
        size="medium"
        label={label}
        margin="none"
        onChange={handleInput}
        required={required}
        fullWidth
        color={focused ? "primary" : "warning"}
        type={type === "password" ? (visiblity ? "text" : "password") : type}
        slotProps={{
          input: {
            ...inputProps,
            endAdornment: type === "password" && value ? passwordIcon() : <></>,
          },
        }}
      />
    </FormControl>
  );
}
