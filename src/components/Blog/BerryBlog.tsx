import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BerryHeader from "../Header/BerryHeader";
import BerryBlogInfo from "./BerryBlogInfo";
import { $api } from "../../utils/http";
import { ReactSVG } from "react-svg";
import GoBackArrow from "../../images/GoBackArrow.svg";

const BerryBlog = () => {
  const { id } = useParams();
  const [blog, setBlog]: any = useState();
  console.log(useParams());

  useEffect(() => {
    const getBlogById = async () => {
      try {
        const response = await $api.get(`/blogs/${id}`);
        const newBlogs = response.data;
        setBlog(newBlogs);
      } catch (error) {
        console.error("Fetch error in Blogs", error);
      }
    };
    getBlogById();
  }, [id]);

  console.log(blog);

  return (
    <>
      <BerryHeader />
      <div style={{ position: "absolute", left: 80, top: 120 }}>
        <Link to={"/"}>
          <ReactSVG src={GoBackArrow} />
        </Link>
      </div>
      <BerryBlogInfo blog={blog} />
      {/* CAROUSEL */}
    </>
  );
};

export default BerryBlog;
