import React, { useState, useEffect } from "react";
import { useFirebase } from "../../firebaseconfig";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";

const ShowData = () => {
  const { fetchRecord, fetchPatientInfo } = useFirebase();
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [patientInfo, setPatientInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recordsSnapshot = await fetchRecord();
        const formattedRecords = recordsSnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });

        // Sort records by latest Time
        formattedRecords.sort(
          (a, b) =>
            new Date(
              b.Time.split(" ")[0].split("/").reverse().join("-") +
                " " +
                b.Time.split(" ")[1]
            ) -
            new Date(
              a.Time.split(" ")[0].split("/").reverse().join("-") +
                " " +
                a.Time.split(" ")[1]
            )
        );

        setMedicalRecords(formattedRecords);
        console.log(formattedRecords);
        const patientInfoSnapshot = await fetchPatientInfo();
        setPatientInfo(patientInfoSnapshot.data());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [fetchRecord, fetchPatientInfo]);

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "2rem", color: "#0e7490", minHeight: "80vh" }}
    >
      <Typography variant="h3" align="center" gutterBottom>
        Patient Health Record
      </Typography>
      {patientInfo && (
        <Paper
          style={{
            marginBottom: "2rem",
            padding: "1rem",
            backgroundColor: "#1e293b",
          }}
        >
          <Typography variant="h5" style={{ color: "#94a3b8" }} gutterBottom>
            Patient Information
          </Typography>
          <Typography variant="body1" style={{ color: "#cbd5e1" }}>
            Name: {patientInfo.name}
          </Typography>
          <Typography variant="body1" style={{ color: "#cbd5e1" }}>
            Address: {patientInfo.address}
          </Typography>
          <Typography variant="body1" style={{ color: "#cbd5e1" }}>
            Date of Birth: {patientInfo.DOB}
          </Typography>
          <Typography variant="body1" style={{ color: "#cbd5e1" }}>
            Phone Number: {patientInfo.phoneNumber}
          </Typography>
        </Paper>
      )}
      <TableContainer component={Paper} style={{ backgroundColor: "#1e293b" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "#94a3b8" }}>Time</TableCell>
              <TableCell style={{ color: "#94a3b8" }}>
                MedicalReportId
              </TableCell>
              <TableCell style={{ color: "#94a3b8" }}>Blood Group</TableCell>
              <TableCell style={{ color: "#94a3b8" }}>Disease Name</TableCell>
              <TableCell style={{ color: "#94a3b8" }}>Description</TableCell>
              <TableCell style={{ color: "#94a3b8" }}>Height</TableCell>
              <TableCell style={{ color: "#94a3b8" }}>Weight</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicalRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.Time}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.medReportId}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.bloodGroup}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.diseaseName}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.diseaseDescription}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.height}
                </TableCell>
                <TableCell style={{ color: "#cbd5e1" }}>
                  {record.weight}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ShowData;
