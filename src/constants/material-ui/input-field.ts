export function fieldProps(data: {
  value: string | number;
  background?: string;
  noBorder?: boolean;
  radius?: number;
}) {
  const { value, background, noBorder, radius } = data;

  const mainColor = value ? "green" : "rgba(120, 120, 120, 0.5)";

  const commonStyles = {
    backgroundColor: "transparent",
    borderRadius: "8px",
  };

  const borderWidth = "1.4px";

  return {
    input: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          ...commonStyles,
          border: noBorder ? "none" : `${borderWidth} solid ${mainColor}`,
        },
        "&:hover fieldset": {
          ...commonStyles,
          border: noBorder ? "none" : `${borderWidth} solid rgb(131, 131, 210)`,
        },
        "&.Mui-focused fieldset": {
          ...commonStyles,
          border: noBorder ? "none" : `${borderWidth} solid rgb(131, 131, 210)`,
        },
        "& fieldset>legend": {
          fontSize: noBorder ? "none" : "0.64rem",
        },
      },
    },
    inputProps: {
      style: {
        fontSize: "0.85rem",
        backgroundColor: background || "transparent",
        borderRadius: radius || 0,
      },
      // maxLength: 10,
    },
    inputLabelProps: {
      // shrink : true,
      size: "small",
      color: "grey",
      fontSize: "0.85rem",
    },
    helperProps: {
      sx: {
        letterSpacing: -0.25,
        fontSize: "0.8rem",
        padding: "0.35rem 0rem 0.35rem 0rem",
      },
    },
  };
}

export function selectProps(height: string) {
  const props = {
    slotProps: {
      input: {
        sx: {
          fontSize: "0.91rem",
        },
      },
    },

    MenuProps: {
      PaperProps: {
        style: {
          maxHeight: height,
        },
      },
    },
  };

  return props;
}
