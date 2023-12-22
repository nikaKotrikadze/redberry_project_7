import React, { useEffect, useState } from "react";
import {
  useLoginModalStore,
  useSuccessfulLoginRequestStore,
} from "./login.store";
import "./berryloginmodal.css";
import { ReactSVG } from "react-svg";
import closeX from "../../images/close-x.svg";
import tickCircle from "../../images/tick-circle.svg";
import { $api } from "../../utils/http";
import loginErrorIcon from "../../images/loginErrorIcon.svg";

const BerryLoginModal = () => {
  const { isOpen, closeModal }: any = useLoginModalStore();
  const { setIsSuccessful }: any = useSuccessfulLoginRequestStore();
  const [email, setEmail] = useState("");
  const [isLoginError, setIsLoginError] = useState(false);
  const [isLoginSuccess, setIsLoginSuccess] = useState(false);

  const handleInputChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleLoginRequest = async () => {
    try {
      await $api.post("/login", { email });
      setIsLoginSuccess(true);
      setIsSuccessful(email);
    } catch (error) {
      console.log("login error", error);
      setIsLoginError(true);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeModal} className="modal-close-button">
              <ReactSVG src={closeX} />
            </button>
            {isLoginSuccess ? (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "48px",
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
                    წარმატებული ავტორიზაცია
                  </h1>
                </div>

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
                  კარგი
                </button>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "24px",
                }}
              >
                <h1
                  style={{
                    color: "#1A1A1F",
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "32px",
                  }}
                >
                  შესვლა
                </h1>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    gap: "8px",
                  }}
                >
                  <label
                    style={{
                      color: "#1A1A1F",
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    ელ-ფოსტა
                  </label>
                  <input
                    placeholder="Example@redberry.ge"
                    style={{
                      borderRadius: "12px",
                      border: isLoginError
                        ? "1px solid #EA1919"
                        : "1.5px solid #5D37F3",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "20px",
                      padding: "12px 16px",
                      background: isLoginError ? "#FAF2F3" : "transparent",
                    }}
                    value={email}
                    onChange={handleInputChange}
                  />
                  {isLoginError && (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <ReactSVG src={loginErrorIcon} />
                      <h1
                        style={{
                          color: "#EA1919",
                          fontSize: "12px",
                          fontWeight: "400",
                          lineHeight: "20px",
                        }}
                      >
                        ელ-ფოსტა არ მოიძებნა
                      </h1>
                    </div>
                  )}
                </div>
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
                  onClick={handleLoginRequest}
                >
                  შესვლა
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BerryLoginModal;
