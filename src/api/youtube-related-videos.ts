import axios from "axios";


export default (relatedVideoId: string) => {
  return axios.request({
    method: 'GET',
    url: 'https://yt-api.p.rapidapi.com/related',
    params: { id: relatedVideoId },
    headers: {
      'X-RapidAPI-Key': '6ea5555286msh14624eac879c727p1c4636jsnbbab40ddd93c',
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  })
}