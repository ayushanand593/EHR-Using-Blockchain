import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import healthReport from "../../assets/health-report.jpg";
import { useFirebase } from "../../firebaseconfig.js";

const Navbar = ({ account, balance }) => {
  const { LogOut, removeUserDocRef } = useFirebase();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    LogOut();
    removeUserDocRef();
    window.location.href = "/";
  };

  const handleNavigation = () => {
    if (location.pathname === "/show-data") {
      navigate("/home");
    } else {
      navigate("/show-data");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        height: "4rem",
        backgroundColor: "#0891b2",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <div>
          <img
            src={healthReport}
            width="40"
            height="40"
            alt="healthReport"
            style={{ marginLeft: "1rem" }}
          />
        </div>
        <div>
          <h2
            style={{
              fontSize: "1.25rem",
              justifyContent: "center",
              marginRight: "23rem",
            }}
          >
            Welcome to your personal Medical Record!!
          </h2>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "white",
          justifyContent: "space-between",
        }}
      >
        <button onClick={handleNavigation} style={buttonStyle}>
          {location.pathname === "/show-data" ? "Back" : "Show Data"}
        </button>
        <button onClick={handleLogOut} style={buttonStyle}>
          Logout
        </button>
      </div>
    </div>
  );
};

const buttonStyle = {
  border: "2px solid white",
  color: "white",
  borderRadius: "5rem",
  padding: "0.5rem 1.5rem",
  margin: "0 2rem",
  cursor: "pointer",
  backgroundColor: "#164e63",
  height: "50px",
};

export default Navbar;
