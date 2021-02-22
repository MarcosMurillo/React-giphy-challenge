import React, { useContext, useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
import EditableTitle from "../../components/EditableTitle";
export default function MyFavoriteGifList() {
  const { favoriteGifs, removeGif, renameGif } = useContext(
    FavoritesGifContext
  );
  const [myGifs, setMyGifs] = useState([]);

  function handleRemoveGif(id) {
    const gifId = id;
    const result = myGifs.filter((gif) => gif.id !== gifId);
    setMyGifs(result);
    removeGif(gifId);
    toast.success("OK ! GIF removed");
  }

  useEffect(() => {
    setMyGifs(favoriteGifs);
  }, [favoriteGifs]);
  return (
    <div className="wrapper-my-gifs">
      <ul className="e-my-gifs">
        {myGifs.length ? (
          myGifs.map((gif, index) => (
            <li key={index}>
              <img src={gif.image} alt={gif.title} />
              <div className="wrapper">
                <EditableTitle
                  value={gif.title}
                  onChange={(value) => renameGif(gif.id, value)}
                />
                <div className="wrapper">
                  <p>
                    <span className="color-gray text-md fw-600">
                      {`File size: `}
                    </span>
                    <span className="color-gray text-md">{gif.size}</span>
                  </p>
                  <p>
                    <span className="color-gray text-md fw-600">{`Created: `}</span>
                    <span className="color-gray text-md">{gif.created}</span>
                  </p>
                  <p>
                    <span className="color-gray text-md fw-600">{`Dimensions: `}</span>
                    <span className="color-gray text-md">
                      {gif.height}x{gif.width}
                    </span>
                  </p>
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
            <p className="color-primary text-xl">
              Add GIF's to favorites for view
            </p>
          </div>
        )}
      </ul>
    </div>
  );
}
