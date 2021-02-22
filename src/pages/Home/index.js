import React, { useRef, useState, useContext } from "react";
import Header from "../../components/Header";
import GifList from "../../components/GifList";
import { FaSearch, FaStar } from "react-icons/fa";
import { api } from "../../services/api";
import { toast } from "react-toastify";
import { FavoritesGifContext } from "../../contexts/favoritesGifContext";

export default function Home({ history }) {
  const { searchResult, setSearchResult } = useContext(FavoritesGifContext);
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const inputEl = useRef("");
  const arraySize = 28;

  function resetList() {
    setSearchResult([]);
    setOffset(0);
  }

  function handleMyGifs() {
    history.push("/favorites");
  }

  function handleClickButtonSearch() {
    if (inputEl.current.value !== inputValue) {
      resetList();
      setInputValue(inputEl.current.value);
    } else return;
  }

  async function handleSearch(e) {
    if (inputEl.current.value === "" || inputEl.current.value === null) {
      e.preventDefault();
      toast.error("Ops! Inform a value to search");
      return;
    }
    e.preventDefault();
    setOffset(offset + arraySize);
    const { data } = await api.get(
      `/search?q=${inputValue}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
    );
    setTotalCount(data.pagination.total_count);
    setHasMore(true);
    setSearchResult(searchResult.concat(data.data));
  }

  async function fetchLoadMoreData() {
    if (totalCount > offset) {
      setOffset(offset + arraySize);
      setTimeout(async () => {
        const { data } = await api.get(
          `/search?q=${inputValue}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
        );
        setSearchResult(searchResult.concat(data.data));
      }, 1500);
    } else setHasMore(false);
  }

  return (
    <>
      <Header history={history} />
      <div className="e-search">
        <form
          className="__form"
          onSubmit={(e) => {
            handleSearch(e);
          }}
        >
          <input type="text" placeholder="Search" ref={inputEl} />
          <button
            type="submit"
            onClick={() => {
              handleClickButtonSearch();
            }}
          >
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="favorites">
        <button
          onClick={() => {
            handleMyGifs();
          }}
        >
          <FaStar className="color-white icon-xl" /> My favorite GIF's
        </button>
      </div>
      <GifList
        totalCount={totalCount}
        offset={offset}
        arraySize={arraySize}
        inputValue={inputValue}
        gifs={searchResult}
        hasMore={hasMore}
        loadMore={() => {
          fetchLoadMoreData();
        }}
      />
    </>
  );
}
