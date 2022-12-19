import styles from './HomePage.module.scss';
import trendingVideos from '../../api/youtube-trending-video-list';
import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import HomepageVideoItem from '../../components/HomepageVideoItem/HomepageVideoItem';

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

  useEffect(() => {
    trendingVideos()
      .then(el => {
        setVideos(shuffle(el.data))
      })
  }, [])
  return (
    <div className={styles.container}>
      {
        videos.map((video: IVideo) => (
          <HomepageVideoItem videoInfo={video} key={v4()} />
        ))
      }
    </div>
  );
}

export default Homepage;