// eslint-disable prettier/prettier
import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core";
import {
  TextField,
  Button,
  Container,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  btn: { display: "block", marginTop: 20 },
  dt: {
    width: "80%",
  },
  fc: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    // display: 'block'
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    display: "block",
  },
  cover: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
  },
  button_shadow: {
    "& button": {
      boxShadow: "none",
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// list for the group of keywords
const names = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function AddInfo() {
  // all hooks
  const classes = useStyles();
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [keyword, setKeyword] = React.useState([]);
  const [author, setAuthor] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [details, setDetails] = useState("");
  const [detailsError, setDetailsError] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [locationError, setLocationError] = useState(false);
  const [industryError, setIndustryError] = useState(false);

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAuthorError(false);
    setLocationError(false);
    setIndustryError(false);
    setDetailsError(false);

    if (author == "") {
      setAuthorError(true);
    }
    if (location == "") {
      setLocationError(true);
    }
    if (industry == "") {
      setIndustryError(true);
    }
    if (details == "") {
      setDetailsError(true);
    }
    if (author && location && industry && details) {
      fetch("http://localhost:8000/list", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          author,
          location,
          industry,
          details,
          selectedDate,
          keyword,
        }),
      }).then(() => console.log("submmitted"));
    }
  };
  // history.push("/")

  return (
    <Container>
      <Paper className={classes.cover}>
        <Typography
          variant="h6"
          color="textSecondary"
          component="h2"
          gutterBottom
        >
          Add Data
        </Typography>

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.field}
                onChange={(e) => setAuthor(e.target.value)}
                label="Author"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={authorError}
              />
              <TextField
                className={classes.field}
                onChange={(e) => setLocation(e.target.value)}
                label="Location"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={locationError}
              />
              <TextField
                className={classes.field}
                onChange={(e) => setIndustry(e.target.value)}
                label="Industry Name"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={industryError}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                className={classes.field}
                onChange={(e) => setDetails(e.target.value)}
                label="Details"
                variant="outlined"
                color="secondary"
                multiline
                size="medium"
                rows={4}
                fullWidth
                required
                error={detailsError}
              />

              <FormControl className={classes.dt}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="Accident-date"
                    label="Accident Date"
                    className={classes.button_shadow}
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </FormControl>

              {/* Selection */}
              <FormControl className={classes.fc}>
                <InputLabel id="keyword-label">Keywords</InputLabel>
                <Select
                  labelId="Keywords"
                  id="Keywords"
                  multiple
                  value={keyword}
                  onChange={handleChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, keyword, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Submit Button */}
              <FormControl className={classes.btn}>
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                >
                  Submit
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
