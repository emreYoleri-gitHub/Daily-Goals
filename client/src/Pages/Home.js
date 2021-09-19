import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, List, ListItem, ListItemText, TextField } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import ClearIcon from '@mui/icons-material/Clear';
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import ListItemButton from '@mui/material/ListItemButton';
import Message from "../Components/Alert"



const buttonStyle = {
  display: "flex",
  justifyContent: "flex-end",
  marginBottom: "1rem",
};

const CreateButtonStyle = {
  display: "flex",
  justifyContent: "flex-end",
}

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

const Home = () => {
  const [open, setOpen] = useState(true);
  const [error, setError] = useState("")
  const [date, setDate] = useState(null);
  const [howManyDay, setHowManyDay] = useState(null)
  const [goals, setGoals] = useState([])
  const [goalName, setGoalName] = useState("")

  const handleClose = () => setOpen(false);

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: windowDimensions.width > 1000 ? windowDimensions.width / 1.75 : "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };


  const addDailyGoal = () => {
    if (goalName.length <= 5) {
      setError("Goal name must be at least 5 characters")
    } else if (goals.find(item => item.title.toLowerCase() === goalName.toLowerCase())) {
      setError("This goal has already been added")
    } else {
      let emptyLength = 0

      for (let i = 0; i < goalName.length; i++) {
        const letter = goalName[i];
        if (letter === " ") emptyLength += 1
      }

      if (emptyLength === goalName.length) setError("Goal must contain only null characters")
      else {
        let newGoal = { title: goalName, id: uuidv4(), }
        setGoals([...goals, newGoal])
        setGoalName("")
        setError("")
      }
    }
  }

  const deleteDailyGoal = (id) => {
    setGoals([...goals.filter(item => item.id !== id)])
  }

  const submitHandler = e => {
    e.preventDefault()
    if (goals.length <= 3) setError("The number of goals must be at least three")
    else {
      /* code... */
    }
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

            {error.length ? <Message> {error} </Message> : null}

          </Typography>

          <form action="" onSubmit={submitHandler} >

            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              label="Daily Goals Program Name"
              autoFocus
              color="secondary"
              inputProps={{ min: 10, max: 30 }}
            />

            <Typography variant="div" component="div">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="Program Start Day"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={(date) => setDate(date)}
                  renderInput={(params) => (
                    <TextField {...params} variant="filled" fullWidth required />
                  )}
                  minDate={new Date()}

                />
              </LocalizationProvider>

              <TextField
                variant="filled"
                type="number"
                margin="dense"
                required
                fullWidth
                label="How many days will it take?"
                autoFocus
                color="secondary"
                inputProps={{ min: 5, max: 30 }}
                value={howManyDay}
                onChange={e => setHowManyDay(e.target.value)}
              />

            </Typography>

            <TextField
              variant="filled"
              margin="dense"
              label="Type Your Goals"
              color="secondary"
              fullWidth
              value={goalName}
              onChange={e => setGoalName(e.target.value)}
              disabled={goalName.length > 15 ? true : false}
              InputProps={{
                endAdornment: <IconButton onClick={() =>
                  setGoalName("")
                }>
                  <ClearIcon />
                </IconButton>
              }}
            />

            <Button variant="contained" size="large" fullWidth color="secondary" onClick={addDailyGoal} style={{ marginTop: ".6rem" }}>Add</Button>

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
                      <ListItemButton>
                        <ListItemText primary={item.title} />
                        <Button variant="outlined" color="error" size="medium" onClick={() => deleteDailyGoal(item.id)}>Remove</Button>

                      </ListItemButton>
                    </ListItem>
                  </ul>
                </li>
              ))}
            </List>

            <Typography variant="div" component="div" sx={CreateButtonStyle}>
              <Button variant="outlined" size="large" color="primary" type="submit" fullWidth>Create</Button>
            </Typography>

          </form>
        </Box>
      </Modal>
    </div>
  );

}
export default Home;
