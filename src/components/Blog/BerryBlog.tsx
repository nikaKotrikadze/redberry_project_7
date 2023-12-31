import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BerryHeader from "../Header/BerryHeader";
import BerryBlogInfo from "./BerryBlogInfo";
import { $api } from "../../utils/http";
import { ReactSVG } from "react-svg";
import GoBackArrow from "../../images/GoBackArrow.svg";
import BerryBlogCarousel from "./BerryBlogCarousel";
import { BlogTemplateInterface } from "../../types/BerryBlogTypes";

const BerryBlog = () => {
  const { id } = useParams();
  const [currentBlogId, setCurrentBlogId] = useState<string | undefined | null>(
    null
  );
  const [blog, setBlog] = useState<BlogTemplateInterface | undefined>();

  useEffect(() => {
    const getBlogById = async () => {
      try {
        const response = await $api.get(`/blogs/${id}`);
        const newBlogs: BlogTemplateInterface = response.data;
        setBlog(newBlogs);
        setCurrentBlogId(id);
      } catch (error) {
        console.error("Fetch error in Blogs", error);
      }
    };
    getBlogById();
  }, [id]);
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
      <BerryBlogCarousel
        categories={blog?.categories}
        currentBlogId={currentBlogId}
      />
    </>
  );
};

export default BerryBlog;
