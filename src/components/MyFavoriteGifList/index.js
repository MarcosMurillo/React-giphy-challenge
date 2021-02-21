import React, { useContext, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
export default function MyFavoriteGifList() {
  const { favoriteGifs, removeGif } = useContext(FavoritesGifContext);
  const [myGifs, setMyGifs] = useState(favoriteGifs);

  function handleRemoveGif(id) {
    const gifId = id;
    const result = myGifs.filter((gif) => gif.id !== gifId);
    setMyGifs(result);
    removeGif(gifId);
  }

  return (
    <div className="container-list">
      <ul className="e-my-gifs">
        {myGifs.map((gif, index) => (
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
              <FaEdit className="icon-space icon-effect" onClick={() => {}} />
              <FaTrash
                className="icon-effect"
                onClick={() => {
                  handleRemoveGif(gif.id);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
