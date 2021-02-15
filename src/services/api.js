import axios from 'axios';


//send authorization
export const authorization = {'api_key': process.env.REACT_APP_API_KEY}

export const api = axios.create({
  baseURL: 'https://api.giphy.com/v1/gifs'
});

