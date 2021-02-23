import React, { useContext, useState } from "react";
import moment from "moment";
import { FaStar } from "react-icons/fa";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "react-toastify";

export default function GifList({ gifs, hasMore, loadMore }) {
  const [newGif, setNewGif] = useState([]);
  const { saveGif } = useContext(FavoritesGifContext);

  function convertSizeFile(fileSize) {
    const size = ["Bytes", "KB", "MB", "GB", "TB"];
    if (fileSize === 0) return "0 Byte";
    const _fileSize = parseInt(Math.floor(Math.log(fileSize) / Math.log(1024)));
    return (
      Math.round(fileSize / Math.pow(1024, _fileSize), 2) +
      " " +
      size[_fileSize]
    );
  }

  function handleSaveGif(gif) {
    const updateGif = {
      id: gif.id,
      title: gif.title,
      image: gif.images.original.url,
      height: gif.images.original.height,
      width: gif.images.original.width,
      size: convertSizeFile(gif.images.original.size),
      url: gif.url,
      created: moment(gif.import_datetime).format("DD/MM/YYYY HH:mm:ss"),
    };
    setNewGif([...newGif, updateGif]);
    saveGif(updateGif);
  }
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
                <li
                  key={index}
                  onClick={() => {
                    handleSaveGif(gif);
                  }}
                >
                  <img src={gif.images.original.url} alt={gif.title} />
                  <span>
                    <FaStar className="color-white icon-xl" />
                    Add to favorites
                  </span>
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        </div>
      ) : (
        <div className="feedback-user">
          <p className="color-primary text-xl">Search GIF's to view</p>
        </div>
      )}
    </>
  );
}
