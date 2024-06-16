import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Card, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    backgroundColor: "#334155", // Grey background
  },
  tableCell: {
    color: "#ffffff", // White font
  },
  tableHeadCell: {
    color: "#ffffff", // White font for header
    fontWeight: "bold", // Bold font for header
  },
  tableContainer: {
    maxHeight: "60vh",
  },
  card: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#1e293b",
    color: "#ffffff",
  },
  header: {
    color: "#0e7490",
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: "1.5rem",
  },
});

export default function ShowData(props) {
  const { patientBioMedList } = props;
  const classes = useStyles();

  const formatDate = (dateString) => {
    if (dateString == "" || dateString == undefined) return undefined;

    const dateObj = new Date(dateString);

    const date = dateObj.getDate();
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    let age = currentYear - year;
    age = currentDate >= date && currentMonth >= month ? age : age - 1;

    return `${date}/${month + 1}/${year} ${age}yrs`;
  };

  return (
    <div className={classes.showDataContainer}>
      <Card className={classes.card}>
        <h2 className={classes.header}>HISTORY</h2>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHeadCell}>Sno.</TableCell>
                <TableCell className={classes.tableHeadCell}>Name</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Birth Date
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Phone Number
                </TableCell>
                <TableCell className={classes.tableHeadCell}>Address</TableCell>
                <TableCell className={classes.tableHeadCell}>Weight</TableCell>
                <TableCell className={classes.tableHeadCell}>Height</TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Blood Group
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Disease Name
                </TableCell>
                <TableCell
                  className={classes.tableHeadCell}
                  style={{ minWidth: "200px" }}
                >
                  Disease Description
                </TableCell>
                <TableCell className={classes.tableHeadCell}>
                  Disease StartedOn
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientBioMedList.map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    className={classes.tableCell}
                    component="th"
                    scope="row"
                  >
                    {row.name}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatDate(row.birthDate)}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.phoneNumber}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row._address}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.weight}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.height}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.bloodGroup}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.diseaseName}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {row.diseaseDescription}
                  </TableCell>
                  <TableCell className={classes.tableCell}>
                    {formatDate(row.diseaseStartedOn)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
}
