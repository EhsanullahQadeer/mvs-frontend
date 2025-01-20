export const tableStyles = {
  tableHead: {
    "& .MuiTableCell-head": {
      backgroundColor: "#131313",
      color: "#B2B2B2",
      borderTop: "none",
      borderBottom: "1px solid #242424",
      padding: "10px 10px",
      fontSize: "0.875rem",
      fontWeight: 500,
      transition: "color 150ms ease",
      "&:hover": {
        color: "#E0E0E0"
      }
    },
    "& .MuiTableSortLabel-root": {
      color: "inherit",
      "&:hover": {
        color: "#ffffff"
      },
      "&.Mui-active": {
        color: "#ffffff",
        "& .MuiTableSortLabel-icon": {
          color: "#ffffff"
        }
      }
    }
  },
  // You can add more table-related styles here
  tableBody: {
    "& .MuiTableCell-body": {
      borderBottom: "1px solid #242424",
      padding: "10px 10px"
    }
  },
  tablePagination: {
    // Your pagination styles
  }
};