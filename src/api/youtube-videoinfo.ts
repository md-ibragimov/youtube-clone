import axios from "axios";


export default (videoId: string | undefined) => {
  return axios.request({
    method: 'GET',
    url: 'https://yt-api.p.rapidapi.com/video',
    params: { id: videoId },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  })
}