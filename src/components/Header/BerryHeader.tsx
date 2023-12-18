import React from "react";
import "./berryheader.css";
import { ReactSVG } from "react-svg";
import REDBERRYLogo from "../../images/BerryLogo.svg";

const BerryHeader = () => {
  return (
    <header className="header-container">
      <ReactSVG src={REDBERRYLogo} />
      <button className="login-button">შესვლა</button>
    </header>
  );
};

export default BerryHeader;
