import React from "react";
import { ReactSVG } from "react-svg";
import BerryLogo from "../../../images/BerryLogo.svg";
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
      <ReactSVG src={BerryLogo} />
    </div>
  );
};

export default BerryBlogHeader;
