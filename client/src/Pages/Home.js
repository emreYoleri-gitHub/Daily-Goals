import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "1rem",
};

const Home = () => {
  const [open, setOpen] = React.useState(true);
  const [date, setDate] = React.useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal open={open}>
        <Box sx={style}>
          <Typography variant="div" component="div" sx={buttonStyle}>
            <IconButton onClick={handleClose}>
              <CancelIcon />
            </IconButton>
          </Typography>

          <Typography variant="h5" component="h3">
            <div className="text-center mb-1 mt-1">
              Create a New Daily Goals
            </div>
          </Typography>
          <TextField
            variant="filled"
            margin="normal"
            required
            fullWidth
            label="Daily Goals Program Name"
            autoFocus
            color="secondary"
          />

          <Typography variant="div" component="div">
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                disableFuture
                label="Program Start Day"
                openTo="year"
                views={["year", "month", "day"]}
                value={date}
                onChange={(date) => setDate(date)}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" fullWidth required />
                )}
              />
            </LocalizationProvider>

            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              fullWidth
            >
              <ToggleButton value="fiveday" style={{ marginTop: "1rem" }}>
                Five Days
              </ToggleButton>

              <ToggleButton value="tenday" style={{ marginTop: "1rem" }}>
                Ten Days
              </ToggleButton>

              <ToggleButton value="fifteenday" style={{ marginTop: "1rem" }}>
                Fifteen Days
              </ToggleButton>
            </ToggleButtonGroup>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Home;
