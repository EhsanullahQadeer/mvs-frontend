const getMuiStyles = () => {
  const muiStyles = {
    searchInputTextField: {
      justifyContent: "flex",
      height: "33px",
      "& .MuiInputAdornment-root": {
        color: "#3D3D3D !important",
      },

      "& fieldset": {
        borderColor: "#3D3D3D !important",

        "&:hover": {
          borderColor: "#3D3D3D !important",
        },
      },
      "& .MuiInputBase-root": {
        width: "100%",
        minWidth: "160px",
        height: "100%",
        borderRadius: "9999px",
        background: "#1C1C1C",
      },
      "& .Mui-focused": {
        width: "100%",
        "& fieldset": { borderColor: "#3D3D3D !important" },
      },
      "& input": {
        minHeight: "100%",
        paddingY: "0 !important",
        color: "#3D3D3D !important",
        fontSize: "14px",
        fontWeight: 400,
        boxShadow: "none !important",
      },
    },

    tableHead: {
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      ".css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active": {
        color: "#848484",
      },
      ".css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root:hover": {
        color: "#848484",
      },
      ".css-1qgma8u-MuiButtonBase-root-MuiTableSortLabel-root.Mui-active .MuiTableSortLabel-icon":
        {
          color: "#848484",
        },
      ".MuiTableCell-head": {
        borderTop: "1px solid #1C1C1C",
        borderBottom: "1px solid #1C1C1C",
        fontWeight: 400,
        fontSize: "14px",
        backgroundColor: "transparent",
        color: "#FFFFFF",
      },
    },

    tableBody: {
      ".MuiTableRow-root": {
        cursor: "pointer",
        backgroundColor: "#0F0F0F",
        ":hover": { backgroundColor: "#101113" },
      },
      ".MuiTableCell-body": {
        color: "#B2B2B2",
        fontSize: "12px",
        fontWeight: 400,
        borderBottom: "1px solid #242424",
      },
    },

    tablePagination: {
      "& .MuiTablePagination-selectLabel": {
        display: "none",
      },
      "& .MuiInputBase-root": {
        backgroundColor: "#161616",
        padding: "4px 14px",
        borderRadius: "100px",
        "& svg": {
          color: "#666666",
        },

        "& .MuiSelect-select": {
          color: "#A3A3A3",
          fontSize: "16px",
          fontWeight: 500,
          backgroundColor: "transparent !important",
          paddingRight: "8px !important",
          display: "flex",
          alignItems: "center",
        },
      },
      "& .MuiTablePagination-displayedRows": {
        color: "white",
      },
      "& .MuiButtonBase-root.Mui-disabled": {
        color: "#A3A3A3",
      },
      "& .MuiButtonBase-root": {
        color: "white",
      },
    },

    tableCheckbox: {
      "&.MuiCheckbox-root": {
        color: "#666",

        "&.Mui-checked": {
          color: "#9EFF00",
        },

        "&.MuiCheckbox-indeterminate": {
          color: "#9EFF00",
        },
      },
    },

    SelectDropdown: {
      color: "#fff",
      backgroundColor: "#161616",
      borderRadius: "8px",
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
      },
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2B2B2B",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#2B2B2B",
      },

      svg: {
        color: "#2B2B2B",
      },
    },
    selectDropdownMenuItem: {
      color: "#D7D7D7",
      fontSize: "12px",
      fontWeight: 400,
      borderBottom: "1px solid #202020",
      "&:hover": {
        backgroundColor: "#242424",
      },
      "&.Mui-selected": {
        backgroundColor: "#242424",
        "&:hover": {
          backgroundColor: "#242424",
        },
      },
    },
    muiChip: {
      border: "1px solid #2B2B2B",
      backgroundColor: "#161616",
      color: "#D7D7D7",
      borderRadius: "8px",
      fontSize: "12px",
      fontWeight: 400,
      span: {
        paddingX: "8px",
        paddingY: "4px",
      },
    },

    singleSelectDropdownStyles: {
      ":hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3d3d3d",
        },
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3d3d3d",
        },
      },

      "& .MuiSelect-select": {
        paddingLeft: "16px",
        paddingY: "12px",
        backgroundColor: "#131313",
        borderRadius: "8px",
        color: "#666666",
        fontSize: "14px",
        fontWeight: "400",
      },

      "& svg": {
        color: "#666666",
      },

      "& fieldset": {
        borderColor: "#242424",
        borderRadius: "8px",
      },
    },

    radioButtonLabel: {
      marginLeft: "-7px",
      color: "#848484",
      "& .MuiRadio-root": {
        padding: "8px",
        width: "32px",
        height: "32px",
        color: "#848484",

        "&.Mui-checked": {
          color: "#9EFF00",
        },
      },

      "& .MuiFormControlLabel-label": {
        fontSize: "14px",
        fontWeight: 400,
      },
    },

    passwordFieldStyles: {
      backgroundColor: "#0F0F0F",
      color: "#666666",
      fontSize: "14px",
      fontWeight: "400",
      padding: "12px 16px",
      borderRadius: "8px",

      "& .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #242424",
      },

      "&:hover": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3d3d3d",
        },
      },

      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#3d3d3d",
        },
      },

      "& .MuiInputBase-input": {
        padding: 0,
        border: 0,
        boxShadow: "none",
      },

      "& .MuiIconButton-root": {
        color: "#666666",
      },
    },

    switchToggleStyle: {
      padding: 0,
      height: "25px",
      width: "48px",
      borderRadius: "20px",

      "& .MuiButtonBase-root": {
        padding: "1px",
        height: "23px",

        "&.Mui-checked": {
          transform: "translateX(24px)",
          color: "#fff",
        },
      },

      "& .MuiSwitch-track": {
        backgroundColor: "#242424",
        borderRadius: "20px",
        opacity: 1,
      },

      "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase.Mui-checked+.MuiSwitch-track":
        {
          backgroundColor: "#9EFF00",
          opacity: 1,
        },
    },
  };
  return muiStyles;
};

export default getMuiStyles;
