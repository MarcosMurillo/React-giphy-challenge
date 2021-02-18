import React, { useContext, useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
import InfiniteScroll from "react-infinite-scroll-component";

export default function GifList({ gifs, hasMore, loadMore }) {
  const [newGif, setNewGif] = useState([]);
  const { saveGif, favoriteGifs } = useContext(FavoritesGifContext);

  function handleSaveGif(gif) {
    console.log("gif before state: ", gif);
    const newGif1 = {
      ...newGif,
      id: gif.id,
      title: gif.title,
      height: gif.images.fixed_height.height,
      width: gif.images.fixed_height.width,
      size: gif.images.fixed_height.size,
      url: gif.images.fixed_height.url,
    };
    saveGif(newGif1);
  }

  useEffect(() => {
    console.table(favoriteGifs);
  }, [favoriteGifs]);
  return (
    <>
      {gifs.length ? (
        <div className="list-container">
          <InfiniteScroll
            dataLength={gifs.length}
            next={() => loadMore()}
            hasMore={hasMore}
            loader={
              hasMore && (
                <span className="color-white text-sm fw-600">Loading...</span>
              )
            }
          >
            <ul className="e-list">
              {gifs.map((gif, index) => (
                <li key={`${index}`}>
                  <img src={gif.images.fixed_height.url} alt={gif.title} />
                  <div className="selected-gif">
                    <button
                      onClick={() => {
                        handleSaveGif(gif);
                      }}
                    >
                      <FaSave className="color-primary icon-xl" />
                      Salvar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="feedback-user">
          <p className="color-primary text-xl">
            Pesquise para visualizar os gifs
          </p>
        </div>
      )}
    </>
  );
}
