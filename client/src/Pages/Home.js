import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import ListItemButton from '@mui/material/ListItemButton';
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux"
import { goalActions } from "../Redux/Actions/index"
import Message from "../Components/Alert"

const theme = createTheme();

const CreateButtonStyle = {
  marginTop: "1rem",
  display: "flex",
  justifyContent: "flex-end",
}

const Home = ({ history }) => {

  const [programName, setProgramName] = useState("")
  const [error, setError] = useState("")
  const [date, setDate] = useState(new Date());
  const [howManyDay, setHowManyDay] = useState("")
  const [goals, setGoals] = useState([])
  const [goalName, setGoalName] = useState("")



  const dispatch = useDispatch()

  const { currentUser } = useSelector(state => state.users)

/*   if (currentUser) history.push("/")
 */  const { createGoalProgram } = bindActionCreators(goalActions, dispatch)

  const addDailyGoal = () => {
    if (goalName.length < 5) {
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

  const submitHandler = async (e) => {
    e.preventDefault()
    if (goals.length <= 3) setError("The number of goals must be at least three")
    else {
      await createGoalProgram()
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mb: 3, bgcolor: 'secondary.main' }}>
            <AddCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5" >
            Create a New Daily Program
          </Typography>

          {error.length ? <Message > {error} </Message> : null}


          <form onSubmit={submitHandler}>

            <TextField
              value={programName}
              onChange={e => setProgramName(e.target.value)}
              variant="filled"
              margin="normal"
              required
              fullWidth
              label="Daily Goals Program Name"
              autoFocus
              color="secondary"
              inputProps={{ minLength: 10, maxLength: 30 }}
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label="Program Start Day"
                inputFormat="MM/dd/yyyy"
                value={date}
                onChange={(date) => setDate(date)}
                renderInput={(params) => (
                  <TextField {...params} variant="filled" fullWidth required
                  />
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
                endAdornment: <IconButton onClick={
                  addDailyGoal
                }>
                  <AddCircleIcon />
                </IconButton>
              }}
            />

            {goals.length ? <List
              sx={{
                marginTop: "1rem",
                width: '100%',
                bgcolor: 'background.paper',
                overflow: 'auto',
                maxHeight: 250,
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
                        <IconButton color="error" onClick={() => deleteDailyGoal(item.id)}><DeleteForeverIcon /></IconButton>

                      </ListItemButton>
                    </ListItem>
                  </ul>
                </li>
              ))}
            </List> : null}

            <Typography variant="div" component="div" sx={CreateButtonStyle}>
              <Button variant="contained" size="large" color="secondary" type="submit" fullWidth>Create</Button>
            </Typography>


          </form>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Home