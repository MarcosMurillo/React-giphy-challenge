import React from "react";
import { FaSearch } from "react-icons/fa";
//import { api, authorization } from "../../services/api";
import { mock } from "../../services/mock";

export default function GiphyList() {
  // async function fetchData(){
  //   const response = await api.get('/trending', {headers: authorization})
  //   return response
  // }
  return (
    <>
      <div className="e-search">
        <form className="__form" onSubmit={() => {}}>
          <input
            type="text"
            placeholder="Search"
            // value={this.state.repositoryInput}
            // onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
      <div className="container">
        <ul className="e-list">
          {mock.data.map((giphy) => (
            <li key={giphy.id}>
              <img src={giphy.images.fixed_height.url} alt={giphy.title} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
