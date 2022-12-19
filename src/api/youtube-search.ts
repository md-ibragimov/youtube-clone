import axios from "axios";


export default (request: string, nextPageToken: string = "") => {
  return axios.request({
    method: 'GET',
    url: 'https://youtube-v31.p.rapidapi.com/search',
    params: {
      q: request,
      id: 'dQw4w9WgXcQ',
      part: 'snippet',
      maxResults: '50',
      pageToken: nextPageToken,
      type: 'channel,video'
    },
    headers: {
      'X-RapidAPI-Key': import.meta.env.VITE_YOUTUBE_API_KEY,
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  })
}