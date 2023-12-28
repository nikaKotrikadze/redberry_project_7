import React from "react";
import { ReactSVG } from "react-svg";
import REDBERRYLogo from "../../../images/BerryLogo.svg";
import { Link } from "react-router-dom";
const BerryBlogHeader = () => {
  const handleLogoClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        display: "flex",
        height: "80px",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        borderBottom: "1px solid #E4E3EB",
      }}
    >
      <Link to={"/"} onClick={handleLogoClick}>
        <ReactSVG src={REDBERRYLogo} />
      </Link>
    </div>
  );
};

export default BerryBlogHeader;
