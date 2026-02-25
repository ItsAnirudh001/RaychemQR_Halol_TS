import { SelectChangeEvent } from "@mui/material";
import React from "react";

export type SelectEvent =
  | React.ChangeEvent<
    Omit<HTMLInputElement, "value"> & {
      value: string;
    }
  >
  | (Event & {
    target: {
      value: string;
      name: string;
    };
  })
  | React.ChangeEvent<
    Omit<HTMLInputElement, "value"> & {
      value: number;
    }
  >
  | (Event & {
    target: {
      value: number;
      name: string;
    };
  });

export interface SelectItem {
  label: string | number;
  value: string | number;
}

export interface SelectProps {
  label: string;
  value: string | number;
  items: SelectItem[];
  handleChange: (e: SelectChangeEvent) => void;
  className?: string;
}

export type MuiInputChangeEvent = React.ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement
>;

export interface MuiInputProps {
  value: string | number;
  label: string;
  onChange?: (e: MuiInputChangeEvent) => void;
  key?: string;
  type: string;
  placeholder: string;
  required: boolean;
  background?: string;
  noBorder?: boolean;
  radius?:number
}