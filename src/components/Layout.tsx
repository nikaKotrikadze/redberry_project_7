import React from "react";
import BerryHeader from "./Header/BerryHeader";
import BerryHero from "./Hero/BerryHero";
import BerryBlogNavigation from "./BlogNavigation/BerryBlogNavigation";
import BerryBlogs from "./Blogs/BerryBlogs";

const Layout = () => {
  return (
    <>
      <BerryHeader />

      <BerryHero />
      <BerryBlogNavigation />
      <BerryBlogs />
    </>
  );
};

export default Layout;
