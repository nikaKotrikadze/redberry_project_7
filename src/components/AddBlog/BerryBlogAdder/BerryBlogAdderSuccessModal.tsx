import React from "react";
import { useBlogAddedSuccessfullyModalStore } from "./blogadder.store";
import { ReactSVG } from "react-svg";
import tickCircle from "../../../images/tick-circle.svg";
import closeX from "../../../images/close-x.svg";
import { Link } from "react-router-dom";

const BerryBlogAdderSuccessModal = () => {
  const { isOpen, closeModal }: any = useBlogAddedSuccessfullyModalStore();

  return (
    isOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <Link to={"/"}>
            <button onClick={closeModal} className="modal-close-button">
              <ReactSVG src={closeX} />
            </button>
          </Link>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "48px",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <ReactSVG src={tickCircle} />
              <h1
                style={{
                  color: "#1A1A1F",
                  fontWeight: "700",
                  fontSize: "20px",
                  lineHeight: "28px",
                }}
              >
                ჩანაწი წარმატებით დაემატა{" "}
              </h1>
            </div>
            <Link to={"/"} style={{ width: "100%" }}>
              <button
                style={{
                  width: "100%",
                  backgroundColor: "#5D37F3",
                  color: "#FFFFFF",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "20px",
                  padding: "10px 20px 10px 20px",
                  borderRadius: "8px",
                }}
                onClick={closeModal}
              >
                მთავარ გვერდზე დაბრუნება
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};
export default BerryBlogAdderSuccessModal;
