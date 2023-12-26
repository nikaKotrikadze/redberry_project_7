import React from "react";
import { ReactSVG } from "react-svg";
import REDBERRYLogo from "../../../images/BerryLogo.svg";
import { Link } from "react-router-dom";
const BerryBlogHeader = () => {
  return (
    <div
      style={{
        display: "flex",
        height: "80px",
        alignItems: "center",
        justifyContent: "center",
        background: "#FFFFFF",
        borderBottom: "1px solid #E4E3EB",
      }}
    >
      <Link to={"/"}>
        <ReactSVG src={REDBERRYLogo} />
      </Link>
    </div>
  );
};

export default BerryBlogHeader;
