import axios from "axios";


export default (channelId: string, nextPage: string = '') => {
  return axios.request({
    method: 'GET',
    url: 'https://yt-api.p.rapidapi.com/channel',
    params: { id: channelId, token: nextPage },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'yt-api.p.rapidapi.com'
    }
  })
}