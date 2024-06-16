import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from "moment";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/footer";
import Feature from "./components/Feature/feature";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/login";
import { FirebaseProvider } from "./firebaseconfig";
import ShowData from "./components/ShowData/showdata";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <FirebaseProvider>
        <Login />
        <Feature />
        <Footer />
      </FirebaseProvider>
    ),
  },
  {
    path: "/home",
    element: (
      <>
        <FirebaseProvider>
          <Navbar />
          <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
            <App />
          </MuiPickersUtilsProvider>
          <Footer />
        </FirebaseProvider>
      </>
    ),
  },
  {
    path: "/show-data", // Add the new route
    element: (
      <>
        <FirebaseProvider>
          <Navbar />
          <ShowData />
          <Footer />
        </FirebaseProvider>
      </>
    ),
  },
]);

ReactDOM.render(
  // <React.StrictMode>

  <>
    <RouterProvider router={router} />
  </>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
