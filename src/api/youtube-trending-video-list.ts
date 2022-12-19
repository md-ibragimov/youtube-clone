import axios from "axios";


export default () => {
  return axios.request({
    method: 'GET',
    url: 'https://ytube-videos.p.rapidapi.com/trending',
    params: {location: 'RU'},
    headers: {
      'X-RapidAPI-Key': '6ea5555286msh14624eac879c727p1c4636jsnbbab40ddd93c',
      'X-RapidAPI-Host': 'ytube-videos.p.rapidapi.com'
    }
  })
}