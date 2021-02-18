import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import Routes from "./routes";
import history from "./services/history";
import FavoritesGifProvider from "./contexts/favoritesGifContext";
import "./styles/global.scss";

export default function App() {
  return (
    <FavoritesGifProvider>
      <BrowserRouter history={history}>
        <Switch>
          <Routes />
        </Switch>
      </BrowserRouter>
    </FavoritesGifProvider>
  );
}
