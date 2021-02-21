import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import history from "./services/history";
import FavoritesGifProvider from "./contexts/favoritesGifContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

export default function App() {
  return (
    <FavoritesGifProvider>
      <BrowserRouter history={history}>
        <Routes />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </FavoritesGifProvider>
  );
}
