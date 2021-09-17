import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, List, ListItem, ListItemText, ListSubheader, TextField } from "@mui/material";
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
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState(null);
  const [goals, setGoals] = useState([])
  const [goalName, setGoalName] = useState("")

  const handleClose = () => setOpen(false);

  const [alignment, setAlignment] = useState("left");
  

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const addDailyGoal = () => {
    let newGoal = {
      title: goalName,
      id: uuidv4(),
    }
    setGoals([...goals, newGoal])
    setGoalName("")
  }

  return (
    <div>
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

          <TextField
            variant="filled"
            margin="normal"
            required
            label="Type Your Goals"
            color="secondary"
            fullWidth
            value={goalName}
            onChange={e => setGoalName(e.target.value)}
          />

          <Button variant="contained" size="large" fullWidth color="secondary" onClick={addDailyGoal}>Add</Button>

          <List
            sx={{
              marginTop: "1rem",
              width: '100%',
              bgcolor: 'background.paper',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}

          >
            {goals.map((item, i) => (
              <li key={i}>
                <ul>
                  <ListItem>
                    <ListItemText primary={item.title} />
                    <Button variant="contained" color="error" size="medium">Remove</Button>
                  </ListItem>
                </ul>
              </li>
            ))}
          </List>
        </Box>
      </Modal>
    </div>
  );

}
export default Home;
