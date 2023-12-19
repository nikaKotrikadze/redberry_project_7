import React from "react";
import "./berryheader.css";
import { ReactSVG } from "react-svg";
import REDBERRYLogo from "../../images/BerryLogo.svg";
import {
  useLoginModalStore,
  useSuccessfulLoginRequestStore,
} from "../Login/login.store";
import BerryLoginModal from "../Login/BerryLoginModal";
import { Link } from "react-router-dom";

const BerryHeader = () => {
  const { openModal }: any = useLoginModalStore();
  const { isSuccessful, clearSuccessfulLogin, email }: any =
    useSuccessfulLoginRequestStore();
  const handleLoginClick = () => {
    console.log("logiiin");
    openModal();
  };

  return (
    <header className="header-container">
      <ReactSVG src={REDBERRYLogo} />
      <BerryLoginModal />
      {isSuccessful ? (
        <>
          <Link to={"/add-blog"}>
            <button className="add-blog-button">დაამატე ბლოგი</button>
          </Link>
          {/* <button onClick={clearSuccessfulLogin} className="logout-button">
            გასვლა
          </button>
          <p>Logged in as: {email}</p> */}
        </>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>
          შესვლა
        </button>
      )}
    </header>
  );
};

export default BerryHeader;
