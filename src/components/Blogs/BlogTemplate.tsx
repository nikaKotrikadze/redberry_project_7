import React, { useEffect } from "react";
import "./blogtemplate.css";
import groundImage from "../../images/ground.jpg";
import Arrow from "../../images/Arrow.svg";
import { ReactSVG } from "react-svg";
import { Link } from "react-router-dom";
import { BlogTemplateInterface } from "../../types/BerryBlogTypes";

const BlogTemplate = ({
  id,
  image,
  author,
  categories,
  description,
  publish_date,
  title,
}: BlogTemplateInterface) => {
  const truncatedText = description.slice(0, 80).trim();

  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="blog-template-container">
      <img
        src={image}
        width={408}
        height={328}
        style={{ borderRadius: "12px" }}
      />
      {/* info container */}
      <div className="blog-info-container">
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h2
            style={{
              color: "#1A1A1F",
              fontSize: "16px",
              fontWeight: "500",
              lineHeight: "20px",
            }}
          >
            {author}
          </h2>
          <h4
            style={{
              color: "#85858D",
              fontSize: "12px",
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {publish_date}
          </h4>
        </div>
        <div>
          <h1
            style={{
              color: "#1A1A1F",
              fontSize: "20px",
              fontWeight: "500",
              lineHeight: "28px",
            }}
          >
            {title}
          </h1>
        </div>
        <div
          style={{
            display: "flex",
            gap: 14,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {categories.map((item: any) => (
            <h5
              key={item.id}
              style={{
                color: item.text_color,
                background: item.background_color,
                lineHeight: "16px",
                fontSize: "12px",
                fontWeight: "500",
                padding: "6px 10px 6px 10px",
                borderRadius: "30px",
              }}
            >
              {item.title}
            </h5>
          ))}
        </div>
        <div>
          <h3
            style={{
              color: "#404049",
              fontSize: "16px",
              lineHeight: "28px",
              fontWeight: "400",
            }}
          >
            {truncatedText}
            {truncatedText.length < 80 ? null : "..."}
          </h3>
        </div>

        <Link
          to={`/blogs/${id}`}
          onClick={handleLinkClick}
          style={{
            display: "flex",
            textDecoration: "none",
            color: "#5D37F3",
            gap: "4px",
          }}
        >
          სრულად ნახვა
          <ReactSVG src={Arrow} />
        </Link>
      </div>
    </div>
  );
};

export default BlogTemplate;
