import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { signInWithPhoneNumber } from "firebase/auth";
// Initialize Firebase app

const firebaseConfig = {
  apiKey: "Your api key",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

// Create Firebase Context
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app);

const FirebaseContext = createContext(null);
export const useFirebase = () => useContext(FirebaseContext);

// Provider component to wrap your app with Firebase context
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userDocRef, setUserDocRef] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const signInUserWithPhoneNumber = (formatPh, appVerifier) =>
    signInWithPhoneNumber(auth, formatPh, appVerifier);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // console.log(`user.uid= ${user.uid}`);
      } else {
        setUser(null);
      }
    });
  }, []);

  const handleUserDocRef = (docRef) => setUserDocRef(docRef);
  // useEffect((docRef) => setUserDocRef(docRef), [userDocRef]);

  useEffect(() => {
    const savedUserDocRef = sessionStorage.getItem("userDocRef");
    const savedPhoneNumber = sessionStorage.getItem("savedPhoneNumber");
    if (savedPhoneNumber) {
      setPhoneNumber(JSON.parse(savedPhoneNumber));
    }
    if (savedUserDocRef) {
      setUserDocRef(JSON.parse(savedUserDocRef));
    }
  }, []);
  useEffect(() => {
    sessionStorage.setItem("userDocRef", JSON.stringify(userDocRef));
    sessionStorage.setItem("savedPhoneNumber", JSON.stringify(phoneNumber));
  }, [userDocRef, phoneNumber]);

  const handleUser = async (userData) => {
    console.log(userData.phoneNumber);
    setPhoneNumber(userData.phoneNumber);
    const collectionRef = collection(database, "users");
    const q = query(
      collectionRef,
      where("phoneNumber", "==", userData.phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      try {
        const docRef = await addDoc(collectionRef, {
          userID: userData.uid,
          phoneNumber: userData.phoneNumber,
        }).then(handleUserDocRef(docRef.id));
      } catch (error) {}
    } else {
      const docSnapShot = querySnapshot.docs[0];

      handleUserDocRef(docSnapShot.id);
    }
  };
  const addDataEntries = async (addData) => {
    const collectionRef = collection(database, "users");
    const q = query(collectionRef, where("phoneNumber", "==", phoneNumber));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapShot = querySnapshot.docs[0];
      const docRef = doc(database, "users", docSnapShot.id);

      try {
        await updateDoc(docRef, {
          name: addData.name,
          address: addData._address,
          DOB: addData.birthDate,
        });
        console.log("Document successfully updated!");
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      console.error("No document found with the given phone number.");
    }
  };

  const formatOrderTime = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  };

  const formSubmit = async (patientMedicalData) => {
    const collectionRef = collection(
      database,
      "users",
      userDocRef,
      "medicalRecord"
    );
    console.log("userDocRef", userDocRef);
    const resultObject = await addDoc(collectionRef, {
      // patientDetails: selectedFood,
      weight: patientMedicalData.weight,
      height: patientMedicalData.height,
      bloodGroup: patientMedicalData.bloodGroup,
      diseaseName: patientMedicalData.diseaseName,
      diseaseDescription: patientMedicalData.diseaseDescription,
      diseaseStartedOn: patientMedicalData.diseaseStartedOn,
      medReportId: patientMedicalData.medReportId,
      userID: user.uid,
      Time: formatOrderTime(Date.now()),
    });
    // console.log("auth.currentUser.uid=", auth.currentUser.uid);
    //console.log("resultObject of placeOrder", resultObject);
    return resultObject;
  };
  const fetchRecord = async () => {
    const collectionRef = collection(
      database,
      "users",
      userDocRef,
      "medicalRecord"
    );
    const result = await getDocs(collectionRef);
    return result;
  };
  const fetchPatientInfo = async () => {
    const docRef = doc(database, "users", userDocRef);
    const docSnap = await getDoc(docRef);
    return docSnap;
  };

  const removeUserDocRef = () => {
    return setUserDocRef(null);
  };

  const isLoggedIn = user !== null ? true : false;
  const LogOut = () => signOut(auth);
  return (
    <FirebaseContext.Provider
      value={{
        LogOut,
        isLoggedIn,
        signInUserWithPhoneNumber,
        auth,
        handleUser,
        formSubmit,
        removeUserDocRef,
        addDataEntries,
        fetchRecord,
        fetchPatientInfo,
        phoneNumber,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
