import axios from "axios";


export default (relatedVideoId: string) => {
  return axios.request({
    method: 'GET',
    url: 'https://yt-api.p.rapidapi.com/related',
    params: { id: relatedVideoId },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  })
}