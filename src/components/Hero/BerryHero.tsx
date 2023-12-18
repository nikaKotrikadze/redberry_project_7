import React from "react";
import "./berryhero.css";
import { ReactSVG } from "react-svg";
import HeroImage from "../../images/HeroImage.svg";
const BerryHero = () => {
  return (
    <div className="hero-container">
      <h1 className="hero-title">ბლოგი</h1>
      <ReactSVG src={HeroImage} />
    </div>
  );
};

export default BerryHero;
