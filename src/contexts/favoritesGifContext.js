import React, { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";

export const FavoritesGifContext = createContext();

export default function FavoritesGifProvider({ children }) {
  const [favoriteGifs, setFavoriteGifs] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    if (window.localStorage.favoriteGifs) {
      const storedFavoriteGifs = JSON.parse(window.localStorage.favoriteGifs);
      console.log("storedFavoritegifs: ", storedFavoriteGifs);
      if (storedFavoriteGifs.list) {
        setFavoriteGifs(storedFavoriteGifs.list);
      }
    }
  }, []);

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

    const gifAlreadyExists = favoriteGifs.filter(
      (favoriteGif) => favoriteGif.id === newGif.id
    );
    if (gifAlreadyExists.length) return toast.error("Ops! GIF already added");
    else {
      setFavoriteGifs([...favoriteGifs, newGif]);
      toast.success("Very Nice! GIF successfully added");
    }

    let storedFavoriteGifs = [];
    if (window.localStorage.favoriteGifs) {
      storedFavoriteGifs = JSON.parse(window.localStorage.favoriteGifs);
      storedFavoriteGifs = storedFavoriteGifs.list;
    }

    window.localStorage.setItem(
      "favoriteGifs",
      JSON.stringify({ list: [...storedFavoriteGifs, newGif] })
    );
  }

  function removeGif(id) {
    const gifId = id;
    const handleList = favoriteGifs.filter((gif) => gif.id !== gifId);

    setFavoriteGifs(handleList);

    window.localStorage.setItem(
      "favoriteGifs",
      JSON.stringify({ list: handleList })
    );
  }

  function renameGif(id, value) {
    const gifId = id;
    const gifTitle = value;
    const gif = favoriteGifs.find((gif) => gif.id === gifId);
    gif.title = gifTitle;

    const updatedList = favoriteGifs.map((item) => {
      if (item.id === gifId) item.title = gifTitle;
      return item;
    });
    setFavoriteGifs(updatedList);

    window.localStorage.setItem(
      "favoriteGifs",
      JSON.stringify({ list: updatedList })
    );
  }

  return (
    <FavoritesGifContext.Provider
      value={{
        favoriteGifs,
        saveGif,
        removeGif,
        searchResult,
        setSearchResult,
        totalCount,
        setTotalCount,
        inputValue,
        setInputValue,
        offset,
        setOffset,
        hasMore,
        setHasMore,
        renameGif,
      }}
    >
      {children}
    </FavoritesGifContext.Provider>
  );
}
