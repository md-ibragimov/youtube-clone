import styles from './HomePage.module.scss';
import trendingVideos from '../../api/youtube-trending-video-list';
import HomepageVideoItem from '../../components/HomepageVideoItem/HomepageVideoItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';

function shuffle(arr: Array<Object>) {
  return arr.map(i => [Math.random(), i]).sort().map(i => i[1])
}

interface IVideo {
  videoId: string,
  title: string,
  type: string,
  author: string,
  authorId: string,
  authorUrl: string,
  description: string,
  viewCount: string,
  published: Number
  publishedText: string
  lengthSeconds: Number
  timeText: string
  isVerified: Boolean,
  videoThumbnails: Array<any>

}

function Homepage({ }) {
  const [videos, setVideos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  useEffect(() => {
    setIsLoading(true);
    trendingVideos()
      .then(el => {
        setVideos(shuffle(el.data));
        setIsLoading(false);
      })
  }, [])
  return (
    <div className={styles.container}>
      {
        isLoading ? <CircularProgress
          style={{
            width: '50px',
            height: '50px',
            margin: '0 auto',
            position: 'absolute',
            top: '50%',
            left: 'calc(50% - 25px)'
          }}
        /> :
          videos.map((video: IVideo) => (
            <HomepageVideoItem videoInfo={video} key={v4()} />
          ))
      }
    </div>
  );
}

export default Homepage;