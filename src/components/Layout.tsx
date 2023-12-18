import React from "react";
import BerryHeader from "./Header/BerryHeader";
import BerryHero from "./Hero/BerryHero";

const Layout = () => {
  return (
    <>
      <BerryHeader />
      <div style={{ backgroundColor: "#f3f2fa" }}>
        <BerryHero />
      </div>
    </>
  );
};

export default Layout;
