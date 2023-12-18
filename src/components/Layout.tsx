import React from "react";
import BerryHeader from "./Header/BerryHeader";
import BerryHero from "./Hero/BerryHero";
import BerryBlogNavigation from "./BlogNavigation/BerryBlogNavigation";
import BerryBlogs from "./Blogs/BerryBlogs";

const Layout = () => {
  return (
    <>
      <BerryHeader />
      <div style={{ backgroundColor: "#f3f2fa" }}>
        <BerryHero />
        <BerryBlogNavigation />
        <BerryBlogs />
      </div>
    </>
  );
};

export default Layout;
