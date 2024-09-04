import Popper from "@mui/material/Popper";

function CustomPopper(props) {
  return (
    <Popper
      {...props}
      sx={{
        "& .MuiAutocomplete-paper": {
          backgroundColor: "#1C1C1C",
        },
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 10],
          },
        },
      ]}
    />
  );
}

export default CustomPopper;
