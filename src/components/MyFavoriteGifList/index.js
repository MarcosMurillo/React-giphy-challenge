import React, { useContext } from "react";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
export default function MyFavoriteGifList() {
  const { favoriteGifs } = useContext(FavoritesGifContext);
  return (
    <>
      {favoriteGifs.map((gif) => (
        <div className="color-white" key={Number(gif.id)}>
          {gif.title}
        </div>
      ))}
    </>
  );
}
