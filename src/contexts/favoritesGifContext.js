import React, { useState, createContext } from "react";

export const FavoritesGifContext = createContext();

export default function FavoritesGifProvider({ children }) {
  const [favoriteGifs, setFavoriteGifs] = useState([]);

  function saveGif(gif) {
    console.log(gif);
    const newGif = {
      id: gif.id,
      title: gif.title,
      height: gif.height,
      width: gif.width,
      size: gif.size,
      url: gif.url,
    };
    setFavoriteGifs([...favoriteGifs, newGif]);
  }

  return (
    <FavoritesGifContext.Provider value={{ favoriteGifs, saveGif }}>
      {children}
    </FavoritesGifContext.Provider>
  );
}
