import React from "react";
import BerryBlogHeader from "./BerryBlogHeader/BerryBlogHeader";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import GoBackArrowGray from "../../images/GoBackArrowGray.svg";
import BerryBlogAdderInputs from "./BerryBlogAdder/BerryBlogAdderInputs";
const BerryAddBlog = () => {
  return (
    <div style={{ backgroundColor: "#FBFAFF" }}>
      <BerryBlogHeader />
      <div style={{ position: "absolute", left: 80, top: 120 }}>
        <Link to={"/"}>
          <ReactSVG src={GoBackArrowGray} />
        </Link>
      </div>
      <BerryBlogAdderInputs />
    </div>
  );
};

export default BerryAddBlog;
