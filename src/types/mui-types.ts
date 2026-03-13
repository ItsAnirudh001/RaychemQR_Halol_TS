import { SelectChangeEvent } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";

export type SelectEvent = (
  event: SelectChangeEvent<string | number>,
  child: React.ReactNode,
) => void;

export interface SelectItem {
  label: string | number;
  value: string | number;
}

export interface SelectProps {
  label: string;
  value: string | number;
  items: SelectItem[];
  handleChange: SelectEvent;
  className?: string;
  disabled?:boolean
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
  radius?: number;
  min?: number;
  max?: number;
  disabled?:boolean
}

export interface SelectItemType {
  label: string;
  value: string;
}

export interface PaginationProps {
  data: object[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}
