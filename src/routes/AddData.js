import {
  Box,
  Button,
  Card,
  InputAdornment,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import React from "react";
import style from "./AddData.module.css";
import { useFirebase } from "../firebaseconfig";

const useStyles = makeStyles({
  card: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1e293b",
    color: "#ffffff",
    width: "100%",
  },
  header: {
    color: "#0e7490",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ffffff", // White border
      },
      "&:hover fieldset": {
        borderColor: "#0e7490", // Highlight color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0e7490", // Highlight color on focus
      },
      color: "#ffffff", // White font for input
    },
    "& .MuiOutlinedInput-root.Mui-disabled": {
      "& fieldset": {
        borderColor: "#71717a",
      },
    },
    "& .MuiInputLabel-outlined": {
      color: "#ffffff", // White font for label
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "#0e7490", // Highlight color for label on focus
    },
  },
  date: {
    "& .MuiInputBase-input": {
      color: "#ffffff", // White font for date input
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ffffff", // White border for date input
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0e7490", // Highlight color for date input on hover
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0e7490", // Highlight color for date input on focus
    },
  },
  button: {
    backgroundColor: "#16a34a",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#166534",
    },
  },
  iconButton: {
    color: "#ffffff",
  },
  inputAdornment: {
    "& .MuiTypography-root": {
      color: "#ffffff", // White color for InputAdornment text
    },
  },
});

export default function AddData(props) {
  const { phoneNumber, addDataEntries } = useFirebase();
  const classes = useStyles();
  const { patientBio, setPatientBio, addUpdatePatientBio, next } = props;

  const handleChange = (e) => {
    if (
      patientBio.name === "" ||
      patientBio._address === "" ||
      patientBio.birthDate === ""
    ) {
      alert("All fields are required");
      return;
    }
    if (window.confirm("Are you sure that you want to save this data")) {
      addDataEntries(patientBio);
      setPatientBio({ ...patientBio, phoneNumber: phoneNumber });
      console.log(patientBio);
      next();
    }
  };

  const as = (e) => {
    console.log(e._d.toDateString());
    if (e && e._d) {
      setPatientBio({ ...patientBio, birthDate: e._d.toDateString() });
    }
  };

  return (
    <div className={style.cardContainer}>
      <Card className={classes.card} elevation={0}>
        <h2 className={classes.header}>Patient Medical Record</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Patient ID"
            variant="outlined"
            value={patientBio.id}
            disabled
            onChange={(e) =>
              setPatientBio({ ...patientBio, id: e.target.value })
            }
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            value={patientBio.name}
            onChange={(e) =>
              setPatientBio({ ...patientBio, name: e.target.value })
            }
          />
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Birth-date"
            format="DD/MM/yyyy"
            value={patientBio.birthDate}
            className={classes.textField}
            inputVariant="outlined"
            onChange={(e) => as(e)}
            KeyboardButtonProps={{
              "aria-label": "change date",
              className: classes.iconButton,
            }}
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            placeholder={phoneNumber}
            disabled
            // InputProps={{
            //   startAdornment: <InputAdornment position="start" className={classes.inputAdornment} > {phoneNumber}</InputAdornment>,
            // }}
            // onChange={(e) =>
            //   setPatientBio({ ...patientBio, phoneNumber: e.target.value })
            // }
          />
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Address"
            variant="outlined"
            value={patientBio._address}
            multiline
            rows={2}
            onChange={(e) =>
              setPatientBio({ ...patientBio, _address: e.target.value })
            }
          />
          <Button className={classes.button} onClick={handleChange}>
            Next
          </Button>
        </form>
      </Card>
    </div>
  );
}
