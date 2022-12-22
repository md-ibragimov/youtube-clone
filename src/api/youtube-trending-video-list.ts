import axios from "axios";


export default () => {
  return axios.request({
    method: 'GET',
    url: 'https://ytube-videos.p.rapidapi.com/trending',
    params: { location: 'RU' },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'ytube-videos.p.rapidapi.com'
    }
  })
}