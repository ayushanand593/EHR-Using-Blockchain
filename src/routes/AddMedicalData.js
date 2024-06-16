import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  InputAdornment,
  TextField,
  makeStyles
} from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
import style from './AddData.module.css'
import { useFirebase } from '../firebaseconfig'

const useStyles = makeStyles({
  table: {
    backgroundColor: '#1e293b', // Grey background
  },
  tableCell: {
    color: '#ffffff', // White font
  },
  tableHeadCell: {
    color: '#ffffff', // White font for header
    fontWeight: 'bold', // Bold font for header
  },
  tableContainer: {
    maxHeight: '60vh',
  },
  card: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#1e293b',
    color: '#ffffff',
    width:'100%'
  },
  header: {
    color: '#0e7490',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff', // White border
      },
      '&:hover fieldset': {
        borderColor: '#0e7490', // Highlight color on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: '#0e7490', // Highlight color on focus
      },
      color: '#ffffff', // White font for input
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& fieldset': {
        borderColor: '#71717a', // Green border for disabled state
      },
    },
    '& .MuiInputLabel-outlined': {
      color: '#ffffff', // White font for label
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#0e7490', // Highlight color for label on focus
    },
    '& .MuiTypography-colorTextSecondary': {
      color: '#0e7490', // Highlight color for label on focus
    },
  },
  date: {
    '& .MuiInputBase-input': {
      color: '#ffffff', // White font for date input
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#ffffff', // White border for date input
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0e7490', // Highlight color for date input on hover
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#0e7490', // Highlight color for date input on focus
    },
  },
  button: {
    backgroundColor: '#16a34a',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#166534',
    },
  },
  buttonRed: {
    backgroundColor: '#d32f2f',
    color: '#ffffff',
    '&:hover': {
      backgroundColor: '#9a0007',
    },
  },
  colorWhite:{
    color:'#ffffff'
  }
})

export default function AddMedicalData(props) {
  const {formSubmit}=useFirebase()
  const classes = useStyles()
  const {
    patientMedicalData,
    setPatientMedicalData,
    addUpdatePatientMedicalData,
    handleBack,
  } = props

  const handleChange = (e) => {
    if (
      patientMedicalData.weight === '' ||
      patientMedicalData.height === '' ||
      patientMedicalData.bloodGroup === '' ||
      patientMedicalData.diseaseName === '' ||
      patientMedicalData.diseaseDescription === '' ||
      patientMedicalData.diseaseStartedOn === ''
    ) {
      alert('All fields are required')
      return
    }
    if (window.confirm('Are you sure that you want to save this data')) {
      formSubmit(patientMedicalData)
      addUpdatePatientMedicalData()
    }
  }

  const as = (e) => {
    console.log(e._d.toDateString())
    if (e && e._d)
      setPatientMedicalData({
        ...patientMedicalData,
        diseaseStartedOn: e._d.toDateString(),
      })
  }
  return (
    <div className={style.cardContainer}>
      <Card className={classes.card} elevation={0}>
        <h2 className={classes.header}>Patient Medical Data</h2>
        <form className={style.form} noValidate autoComplete="off">
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Medical Report ID"
            variant="outlined"
            value={patientMedicalData.medReportId}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                medReportId: e.target.value,
              })
            }
          />
          <div className={style.textFieldGroup}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Weight"
              variant="outlined"
              value={patientMedicalData.weight}
              InputProps={{
               
                endAdornment: (
                  <InputAdornment position="end">KG</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  weight: e.target.value,
                })
              }
            />
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Height"
              variant="outlined"
              value={patientMedicalData.height}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">cm</InputAdornment>
                ),
              }}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  height: e.target.value,
                })
              }
            />
          </div>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Disease Name"
            variant="outlined"
            value={patientMedicalData.diseaseName}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                diseaseName: e.target.value,
              })
            }
          />
          <div className={style.textFieldGroup}>
            <TextField
              className={classes.textField}
              id="outlined-basic"
              label="Blood Group"
              variant="outlined"
              value={patientMedicalData.bloodGroup}
              onChange={(e) =>
                setPatientMedicalData({
                  ...patientMedicalData,
                  bloodGroup: e.target.value,
                })
              }
            />
            <KeyboardDatePicker
            
              margin="normal"
              id="date-picker-dialog"
              label="Disease Started On"
              format="DD/MM/yyyy"
              className={classes.textField}
              value={patientMedicalData.diseaseStartedOn}
              inputVariant="outlined"
              onChange={(e) => as(e)}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                className:classes.colorWhite,
              }}
            />
          </div>
          <TextField
            className={classes.textField}
            id="outlined-basic"
            label="Description"
            variant="outlined"
            value={patientMedicalData.diseaseDescription}
            multiline
            rows={2}
            onChange={(e) =>
              setPatientMedicalData({
                ...patientMedicalData,
                diseaseDescription: e.target.value,
              })
            }
          />
          <div className={style.btnGroup}>
            <Button
              className={classes.buttonRed}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className={classes.button}
              onClick={(e) => handleChange()}
            >
              Save
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
