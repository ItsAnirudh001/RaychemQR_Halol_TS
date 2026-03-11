"use client";

import { SelectProps } from "@/types/mui-types";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

export default function MuiSingleSelect(props: SelectProps) {
  const { label, value, items, handleChange, className } = props;

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={label} className="text-sm! font-medium!">{label}</InputLabel>}
      <Select
        id={label}
        labelId={label}
        value={value}
        label={label}
        onChange={handleChange}
        IconComponent={(props) => (
          <FaChevronDown
            {...props}
            className="pointer-events-none! right-0! absolute! mx-3!"
          />
        )}
        className={
          className ||
          "flex! flex-row! outline-0! border-2! border-blue-300! text-white! focus:border-0! focus:outline-0! text-xs! font-mono! rounded-xl!"
        }
        MenuProps={{
          MenuListProps: {
            className: "shadowed! p-0! bg-queriesmodal-bg! border-none!",
          },
        }}
        sx={{
          //   color: "white",
          //   "& .MuiSelect-select": {
          //     color: "white !important",
          //   },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
          },
        }}
        slotProps={{
          input: {
            className: className || "",
          },
        }}
      >
        {items.map((item, index) => (
          <MenuItem
            className="m-0! text-foreground! py-3! text-xs! font-mono!"
            key={index + 1}
            value={item.value}
          >
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
