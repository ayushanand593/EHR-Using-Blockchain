import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaTwitch,
} from "react-icons/fa";
import SOA from "../../assets/Soa-logo.png";
const sections = [
  {
    title: "Front-End",
    items: ["React", "HTML", "CSS", "Material-UI", "React-icons"],
  },
  {
    title: "Back-End",
    items: ["Firebase", "Firebase Authenticator"],
  },
  {
    title: "BlockChain",
    items: ["Solidity", "Truffle", "MetaMask", "Ganache"],
  },
  {
    title: "Our Team",
    items: ["Ayush Anand", "Priyam Jha", "Ankit Das", "Santosh Kumar Kar"],
  },
];

const items = [
  { name: "Facebook", icon: FaFacebook, link: "https://www.facebook.com/" },
  { name: "Instagram", icon: FaInstagram, link: "https://www.instagram.com/" },
  { name: "Twitter", icon: FaTwitter, link: "https://twitter.com/" },
  { name: "Twitch", icon: FaTwitch, link: "https://www.twitch.tv/" },
  { name: "Github", icon: FaGithub, link: "https://github.com/" },
];

const Footer = () => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#1e293b",
        color: "#d1d5db",
        padding: "16px",
      }}
    >
      <div
        style={{
          maxWidth: "1240px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-evenly",

          borderBottom: "2px solid #4b5563",
          padding: "10px 0",
        }}
      >
        {sections.map((section, index) => (
          <div key={index}>
            <h6
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                paddingTop: "8px",
                marginLeft: "22px",
              }}
            >
              {section.title}
            </h6>
            <ul>
              {section.items.map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "4px 0",
                    color: "#6b7280",
                    cursor: "pointer",
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div
          style={{
            gridColumn: "span 2",
            paddingTop: "32px",
            position: "relative",
            top: "-30px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <img src={SOA} alt="SOA-LOGO" />
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "1240px",
          padding: "16px 8px",
          margin: "0 auto",
          justifyContent: "space-between",
          textAlign: "center",
          color: "#6b7280",
        }}
      >
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "300px",
            paddingTop: "16px",
            fontSize: "2rem",
          }}
        >
          © SDP S-18
        </p>
      </div>
    </div>
  );
};

export default Footer;
