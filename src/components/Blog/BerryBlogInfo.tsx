import React from "react";
import ground from "../../images/ground.jpg";
import "./berrybloginfo.css";

const BerryBlogInfo = ({ blog }: any) => {
  return (
    <div className="specific-blog-info-container">
      <div>
        <img src={blog?.image} width={720} style={{ borderRadius: "12px" }} />
      </div>
      <div
        style={{
          width: 720,
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <h1
            style={{
              color: "#1A1A1F",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "20px",
            }}
          >
            {blog?.author}
          </h1>
          <h1
            style={{
              color: "#85858D",
              fontSize: "12px",
              lineHeight: "16px",
              fontWeight: 400,
            }}
          >
            {blog?.publish_date} • {blog?.email}
          </h1>
        </div>
        <div>
          <h1
            style={{
              color: "#1A1A1F",
              fontSize: "32px",
              fontWeight: 700,
              lineHeight: "40px",
            }}
          >
            {blog?.title}
          </h1>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {blog?.categories.map((item: any) => (
            <h1
              style={{
                color: item.text_color,
                background: item.background_color,
                fontSize: "12px",
                lineHeight: "16px",
                fontWeight: 500,
                padding: "6px 10px 6px 10px",
                borderRadius: "30px",
              }}
            >
              {item?.title}
            </h1>
          ))}
        </div>
      </div>
      <div style={{ width: 720 }}>
        <h1
          style={{
            color: "#404049",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "28px",
          }}
        >
          {blog?.description}
        </h1>
      </div>
    </div>
  );
};

export default BerryBlogInfo;
