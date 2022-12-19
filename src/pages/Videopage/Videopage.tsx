import styles from './Videopage.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import youtubeVideoinfo from '../../api/youtube-videoinfo';
import youtubeRelatedVideos from '../../api/youtube-related-videos';
import numbro from 'numbro';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import RecomendedVideoItem from '../../components/RecomendedVideoItem/RecomendedVideoItem';
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


function Videopage({ }) {
  const [value, setValue] = useState<any>({});
  const [relatedVideos, setRelatedVideos] = useState<any>([]);
  const videoId = useParams().id;

  useEffect(() => {
    youtubeVideoinfo(videoId)
      .then((el: any) => {
        document.title = `${el.data.title} - YouTube`;
        setValue(el.data)

      })
    return function cleanTitle() { document.title = 'YouTube' }
  }, [])
  useEffect(() => {
    youtubeRelatedVideos(`${videoId}`)
      .then((element) => {
        console.log(element)
        setRelatedVideos(element.data.data)
      })
  }, [videoId])

  return (
    <div className={styles.container}>
      <div className={styles['video-wrapper']}>
        <div className={styles.player}>
          <VideoPlayer videoId={useParams().id} />
        </div>
        <div className={styles['video-info']}>
          <Typography className={styles['video-title']}>{value.title}</Typography>
          <Typography className={styles['video-viewers']}>{numbro(value.viewCount).format({
            spaceSeparated: true,
            average: true,

          })} просмотров</Typography>
          <div className={styles['video-channel-wrapper']}>
            <AccountCircleIcon />
            <Typography className={styles['video-channel-title']}>{value.channelTitle}</Typography>
          </div>
          <Typography className={styles['video-viewers']}>{moment(value.publishDate).locale('ru').format('MM to LL')}</Typography>
        </div>
      </div>
      <div className={styles['video-recomendation']}>
        {relatedVideos.map((el: any) => (
          <RecomendedVideoItem key={el.videoId} data={el} />
        ))}
      </div>
    </div>
  );
}

export default Videopage;