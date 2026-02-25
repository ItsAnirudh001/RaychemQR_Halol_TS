"use client";

import React, { useState } from "react";
import { FormControl, TextField, IconButton } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { fieldProps } from "@/constants/material-ui/input-field";
import { MuiInputChangeEvent, MuiInputProps } from "@/types/mui-types";
import { useKeyboardScroll } from "@/hooks/user/useKeyboardScroll";

export default function MuiInput(props: MuiInputProps) {
  const {
    value,
    label,
    onChange,
    key,
    type,
    placeholder,
    required,
    background,
    noBorder,
    radius
  } = props;

  useKeyboardScroll();

  const { input, inputProps } = fieldProps({
    value,
    background,
    noBorder,
    radius
  });

  const [visiblity, setVisiblity] = useState<boolean>(false);
  const [focused, setFocused] = useState<boolean>(false);

  const Icon = visiblity ? VisibilityOutlined : VisibilityOffOutlined;

  function handlePasswordSeen() {
    setVisiblity(true);
    setTimeout(() => setVisiblity(false), 800);
  }

  function passwordIcon() {
    return (
      <IconButton onClick={handlePasswordSeen}>
        <Icon />
      </IconButton>
    );
  }

  function handleInput(e: MuiInputChangeEvent) {
    if (onChange) onChange(e);
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
          inputLabel:{
            className:"text-[0.85rem]! font-medium!"
          }
        }}
      />
    </FormControl>
  );
}
