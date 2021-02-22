import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../../components/Header";
import MyFavoriteGifList from "../../components/MyFavoriteGifList";

export default function Favorites({ history }) {
  function handleBackToHome() {
    return history.push("/");
  }
  return (
    <>
      <Header />
      <div className="go-back">
        <button
          onClick={() => {
            handleBackToHome();
          }}
        >
          <FaArrowLeft className="color-white icon-xl" /> Go back
        </button>
      </div>
      <MyFavoriteGifList />
    </>
  );
}
