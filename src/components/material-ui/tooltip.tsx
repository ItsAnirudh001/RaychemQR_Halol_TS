"use client";

import { Tooltip } from "@mui/material";
import React, { ReactElement } from "react";

export default function MuiTooltip({
  title,
  children,
}: {
  title: string;
  children: ReactElement;
}) {
  return (
    <Tooltip
      title={title}
      slotProps={{
        tooltip: {
          className: "bg-gray-700! rounded-xl! text-white p-2!",
        },
        arrow: {
          className: "text-gray-700!",
        },
      }}
      arrow
    >
      {children}
    </Tooltip>
  );
}
