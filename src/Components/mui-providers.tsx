"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export default function MuiProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      theme={createTheme({
        typography: {
          fontFamily:
            "var(--font-sans), Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        },
      })}
    >
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
