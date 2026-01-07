export function fieldProps(data: { value: string | number }) {
  const { value } = data;

  const mainColor = value ? "rgb(131, 131, 210)" : "rgba(200, 200, 200, 1)";

  return {
    input: {
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          border: `1.5px solid ${mainColor}`,
          backgroundColor: "transparent",
        },
        "&:hover fieldset": {
          border: "1.5px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
        },
        "&.Mui-focused fieldset": {
          border: "1.65px solid rgb(131, 131, 210)",
          backgroundColor: "transparent",
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
      color: mainColor,
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
