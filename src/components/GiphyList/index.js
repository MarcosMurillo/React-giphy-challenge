import React, { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "../../services/api";
import { mock } from "../../services/mock";

export default function GiphyList() {
  const [gifs, setGifs] = useState(mock.data);
  const [offset, setOffset] = useState(24);
  const inputEl = useRef("");
  const arraySize = 24;

  function resetList() {
    setGifs(null);
    setOffset(0);
  }

  async function handleSearch(e) {
    e.preventDefault();
    resetList();
    setOffset(offset + arraySize);
    const { data } = await api.get(
      `/search?q=${inputEl.current.value}&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
    );
    setGifs(gifs.concat(data.data));
  }

  async function fetchInitialData() {
    setOffset(offset + arraySize);
    setTimeout(async () => {
      const { data } = await api.get(
        `/search?q=starwars&api_key=I8Tl1S2Ras9ILwz2jV9gBp71B97HCBlA&limit=${arraySize}&offset=${offset}`
      );
      setGifs(gifs.concat(data.data));
    }, 1500);
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
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="list-container">
        <InfiniteScroll
          dataLength={gifs.length}
          next={fetchInitialData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <ul className="e-list">
            {gifs.map((giphy, index) => (
              <li key={`${giphy.id}-${index}`}>
                <img src={giphy.images.fixed_height.url} alt={giphy.title} />
              </li>
            ))}
          </ul>
        </InfiniteScroll>
      </div>
    </>
  );
}
