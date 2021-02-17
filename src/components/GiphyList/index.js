import React, { useState, useRef } from "react";
import { FaSearch, FaSave } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../services/api";

export default function GiphyList() {
  const [gifs, setGifs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const inputEl = useRef("");
  const arraySize = 28;

  function resetList() {
    setGifs([]);
    setOffset(0);
  }

  function handleClickButtonSearch() {
    if (inputEl.current.value !== inputValue) {
      resetList();
      setInputValue(inputEl.current.value);
    } else return;
  }

  async function handleSearch(e) {
    if (inputEl.current.value === "") {
      return alert("Ops! Informe um valor para realizar a pesquisa");
    }
    e.preventDefault();
    setOffset(offset + arraySize);
    const { data, pagination } = await api.get(
      `/search?q=${inputValue}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
    );
    setTotalCount(pagination.total_count);
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
        <div>
          <button>
            <FaSave />
          </button>
        </div>
      </div>
      <div className="list-container">
        {gifs.length && (
          <InfiniteScroll
            dataLength={gifs.length}
            next={() => {
              fetchLoadMoreData();
            }}
            hasMore={hasMore}
            loader={
              hasMore() && (
                <span className="color-white text-sm fw-600">Loading...</span>
              )
            }
          >
            <ul className="e-list">
              {gifs.map((giphy, index) => (
                <li key={`${giphy.id}-${index}`}>
                  <img src={giphy.images.fixed_height.url} alt={giphy.title} />
                  <FaSave className="icon-xxl" />
                </li>
              ))}
            </ul>
          </InfiniteScroll>
        )}
      </div>
    </>
  );
}
