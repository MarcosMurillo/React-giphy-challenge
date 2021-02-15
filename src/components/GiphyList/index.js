import React from 'react'
import {FaSearch} from 'react-icons/fa'
//import { api, authorization } from "../../services/api";
import {mock} from '../../services/mock'


export default function GiphyList(){
  // async function fetchData(){
  //   const response = await api.get('/trending', {headers: authorization})
  //   return response
  // }
  return (
    <>
      <div className="e-list">
        <form className="__form"onSubmit={()=>{}}>
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
      
      <div>

        {mock.data.map(item => (
          <img src={item.images.fixed_height.url} alt={item.title} />
        ))}

      </div>
    
    </>
  )
}