export function fieldProps(data: { value: string | number }) {
  const { value } = data;

  const mainColor = value ? "green" : "rgba(120, 120, 120, 0.5)";

  const commonStyles = {
    backgroundColor: "transparent",
    borderRadius: "8px",
  };

  const borderWidth = "1.4px"

  return {
    input: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          ...commonStyles,
          border: `${borderWidth} solid ${mainColor}`,
        },
        "&:hover fieldset": {
          ...commonStyles,
          border: `${borderWidth} solid rgb(131, 131, 210)`,
        },
        "&.Mui-focused fieldset": {
          ...commonStyles,
          border: `${borderWidth} solid rgb(131, 131, 210)`,
        },
        "& fieldset>legend": {
          fontSize: "0.64rem",
        },
      },
    },
    inputProps: {
      style: {
        fontSize: "1rem",
      },
      // maxLength: 10,
    },
    inputLabelProps: {
      // shrink : true,
      size: "small",
      color: "grey",
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
