import React, { useContext, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
export default function MyFavoriteGifList() {
  const { favoriteGifs, removeGif } = useContext(FavoritesGifContext);
  const [myGifs, setMyGifs] = useState(favoriteGifs);

  function notifyRemoveGif(message) {
    toast.success(message);
  }

  function handleRemoveGif(id) {
    const gifId = id;
    const result = myGifs.filter((gif) => gif.id !== gifId);
    setMyGifs(result);
    removeGif(gifId);
    notifyRemoveGif("OK ! GIF removed");
  }

  return (
    <div className="wrapper-my-gifs">
      <ul className="e-my-gifs">
        {myGifs.length ? (
          myGifs.map((gif, index) => (
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
          ))
        ) : (
          <div className="feedback-user">
            <p className="color-primary text-xl">Search to view gifs</p>
          </div>
        )}
      </ul>
    </div>
  );
}
