import React, { useState, createContext } from "react";

export const FavoritesGifContext = createContext();

export default function FavoritesGifProvider({ children }) {
  const [favoriteGifs, setFavoriteGifs] = useState([]);

  function saveGif(gif) {
    const newGif = {
      id: gif.id,
      title: gif.title,
      height: gif.height,
      width: gif.width,
      size: gif.size,
      image: gif.image,
      url: gif.url,
      created: gif.created,
    };
    setFavoriteGifs([...favoriteGifs, newGif]);
  }

  function removeGif(id) {
    const gifId = id;
    const handleList = favoriteGifs.filter((gif) => gif.id !== gifId);

    setFavoriteGifs(handleList);
  }

  return (
    <FavoritesGifContext.Provider value={{ favoriteGifs, saveGif, removeGif }}>
      {children}
    </FavoritesGifContext.Provider>
  );
}
