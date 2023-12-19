import React from "react";
import BerryBlogHeader from "./BerryBlogHeader/BerryBlogHeader";
import { Link } from "react-router-dom";
import { ReactSVG } from "react-svg";
import GoBackArrow from "../../images/GoBackArrow.svg";
import BerryBlogAdderInputs from "./BerryBlogAdder/BerryBlogAdderInputs";
const BerryAddBlog = () => {
  return (
    <>
      <BerryBlogHeader />
      <div style={{ position: "absolute", left: 80, top: 120 }}>
        <Link to={"/"}>
          <ReactSVG src={GoBackArrow} />
        </Link>
      </div>
      <BerryBlogAdderInputs />
    </>
  );
};

export default BerryAddBlog;
