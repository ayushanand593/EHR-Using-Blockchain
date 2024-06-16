import { Box, Card, CardContent, Container, Paper, Button, Typography } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Web3 from 'web3';
import style from './App.module.css';

import {
  PATIENT_DATA_LIST_ADDRESS,
  PATIENT_DATA_LIST_ABI,
} from './contracts/PatientData';
import {
  SAVE_DATA_LIST_ADDRESS,
  SAVE_DATA_LIST_ABI
} from './contracts/SaveData';
import Add from './routes/Add';
import AddData from './routes/AddData';
import AddMedicalData from './routes/AddMedicalData';
import ShowData from './routes/ShowData';
import CryptoJS from 'crypto-js';
import sendToServerForSecondEncryption from './server/sendToServerForSecondEncryption';
import Navbar from './components/Navbar/Navbar';
import Balance from './components/Balance/balance';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [patientDataList, setPatientDataList] = useState([]);
  const [patientDataContract, setPatientDataContract] = useState(null);
  const [saveDataContract, setSaveDataContract] = useState(null);
  const [patientBioMedList, setPatientBioMedList] = useState([]);
  const [patientBio, setPatientBio] = useState({
    id: 'PATDHCS2001457',
    name: '',
    birthDate: '20 june 2024',
    phoneNumber: '',
    _address: '',
  });
  const [patientMedicalData, setPatientMedicalData] = useState({
    medReportId: 'MEDREP' + Math.ceil(Math.random() * 1000000000),
    weight: '',
    height: '',
    bloodGroup: '',
    diseaseName: '',
    diseaseDescription: '',
    diseaseStartedOn: '15 apr 2013',
  });

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts();
          setWeb3(web3);
          setAccount(accounts[0]);
          const balanceInWei = await web3.eth.getBalance(accounts[0]);
          const balanceInEther = web3.utils.fromWei(balanceInWei, 'ether');
          setBalance(balanceInEther);

          const patientDataContractCopy = new web3.eth.Contract(
            PATIENT_DATA_LIST_ABI,
            PATIENT_DATA_LIST_ADDRESS
          );
          const saveDataContractCopy = new web3.eth.Contract(
            SAVE_DATA_LIST_ABI,
            SAVE_DATA_LIST_ADDRESS
          );
          setPatientDataContract(patientDataContractCopy);
          setSaveDataContract(saveDataContractCopy);
          decryptEncryptedList(saveDataContractCopy);
        } catch (error) {
          console.error('Error connecting to MetaMask', error);
        }
      } else {
        alert('Please install MetaMask!');
      }
    };

    initWeb3();
  }, []);

  const decryptEncryptedList = async (saveDataContract) => {
    let patientBioMedList = [];
    const totalMedicalReports = await saveDataContract.methods.totalMedicalReports().call();
    for (let i = 0; i < totalMedicalReports; ++i) {
      const {
        hashOfOriginalDataString,
        secondTimeEncryptedString,
        sender,
        medReportId
      } = await saveDataContract.methods.data(i).call();
      let firstCiphertext = sendToServerForSecondEncryption.decryptSecondCipherText(secondTimeEncryptedString, sender, medReportId);
      let originalDataObject = JSON.parse(CryptoJS.AES.decrypt(firstCiphertext, hashOfOriginalDataString).toString(CryptoJS.enc.Utf8));
      let rowData = { ...originalDataObject.patientBio, ...originalDataObject.patientMedicalData };
      patientBioMedList.push(rowData);
    }
    setPatientBioMedList(patientBioMedList);
  };

  const addUpdatePatientMedicalData = () => {
    let JSONStringData = JSON.stringify({ patientBio, patientMedicalData });
    let hash = CryptoJS.SHA256(JSONStringData).toString(CryptoJS.enc.Hex);
    let firstCiphertext = CryptoJS.AES.encrypt(JSONStringData, hash).toString();
    let secondCiphertext = sendToServerForSecondEncryption.encryptFirstCipherText(firstCiphertext, account, patientMedicalData.medReportId);
    saveDataContract.methods
      .saveData(secondCiphertext, hash, patientMedicalData.medReportId).send({ from: account })
      .once('receipt', receipt => {
        setPatientMedicalData({ ...patientMedicalData, medReportId: 'MEDREP' + Math.ceil(Math.random() * 1000000000) });
        decryptEncryptedList(saveDataContract);
      });
  };
  const connectWallet = async () => {
    // Check if MetaMask is installed on user's browser
    if(window.ethereum) {
     const accounts = await window.ethereum.request({ method: 'eth_accounts' });
     const chainId = await window.ethereum.request({ method: 'eth_chainId'});
    } else {
      // Show alert if Ethereum provider is not detected
      alert("Please install Mask");
    }
  }
  
  if (!account) {
    return (
      <Container maxWidth="md" className={style.container} style={{ borderRadius: '0px'}}>
        <Typography variant="h4" component="h1" gutterBottom style={{ color: 'white', display:'flex',justifyContent:'center',alignItems:'center',borderRadius:'0px' }}>
          Please connect to your MetaMask account.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" className={style.container} style={{ borderRadius: '0px'}}>
      <Balance account={account} balance={balance} />
      <Add
        patientBio={patientBio}
        setPatientBio={(obj) => setPatientBio(obj)}
        patientMedicalData={patientMedicalData}
        setPatientMedicalData={(obj) => setPatientMedicalData(obj)}
        addUpdatePatientMedicalData={addUpdatePatientMedicalData}
      />
      <ShowData patientBioMedList={patientBioMedList} />
    </Container>
  );
}

export default App;
