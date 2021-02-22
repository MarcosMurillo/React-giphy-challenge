import React, { useRef, useState } from "react";
import Header from "../../components/Header";
import GifList from "../../components/GifList";
import { FaSearch, FaStar } from "react-icons/fa";
import { api } from "../../services/api";
import { toast } from "react-toastify";

export default function Home({ history }) {
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState(null);
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const inputEl = useRef("");
  const arraySize = 28;

  function resetList() {
    setGifs([]);
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

  function notifySearch(message) {
    toast.error(message);
  }

  async function handleSearch(e) {
    console.log(inputEl.current.value);
    if (inputEl.current.value === "" || inputEl.current.value === null) {
      e.preventDefault();
      notifySearch("Ops! Informe um valor para realizar a pesquisa");
      return;
    }
    e.preventDefault();
    setOffset(offset + arraySize);
    const { data } = await api.get(
      `/search?q=${inputValue}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
    );
    setTotalCount(data.pagination.total_count);
    setHasMore(true);
    setGifs(gifs.concat(data.data));
  }

  async function fetchLoadMoreData() {
    if (totalCount > offset) {
      setOffset(offset + arraySize);
      setTimeout(async () => {
        const { data } = await api.get(
          `/search?q=${inputValue}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
        );
        setGifs(gifs.concat(data.data));
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
          <FaStar className="color-white icon-xl" /> My favorite gifs
        </button>
      </div>
      <GifList
        totalCount={totalCount}
        offset={offset}
        arraySize={arraySize}
        inputValue={inputValue}
        gifs={gifs}
        hasMore={hasMore}
        loadMore={() => {
          fetchLoadMoreData();
        }}
      />
    </>
  );
}
