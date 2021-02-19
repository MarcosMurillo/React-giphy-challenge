import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
export default function MyFavoriteGifList() {
  const { favoriteGifs } = useContext(FavoritesGifContext);
  return (
    <div>
      <ul className="e-my-gifs">
        {favoriteGifs.map((gif, index) => (
          <li key={index}>
            <img src={gif.image} alt={gif.title} />
            <div className="wrapper">
              <strong className="text-xl">{gif.title}</strong>
              <div className="wrapper">
                <span className="color-gray text-md">
                  File size: {gif.size}
                </span>
                <span className="color-gray text-md">
                  Created: {gif.created}
                </span>
                <span className="color-gray text-md">{`Dimensions: ${gif.height}x${gif.width}`}</span>
                <a
                  className="view-original"
                  href={gif.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View original
                </a>
              </div>
            </div>
            <div className="wrapper-icons">
              <FaEdit className="icon-space icon-effect" />
              <FaTrash className="icon-effect" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
