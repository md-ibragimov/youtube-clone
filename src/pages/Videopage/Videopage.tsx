import styles from './Videopage.module.scss';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import youtubeVideoinfo from '../../api/youtube-videoinfo';
import youtubeRelatedVideos from '../../api/youtube-related-videos';
import numbro from 'numbro';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import moment from 'moment';
import RecomendedVideoItem from '../../components/RecomendedVideoItem/RecomendedVideoItem';
import CircularProgress from '@mui/material/CircularProgress';
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Videopage({ }) {
  const [value, setValue] = useState<any>({});
  const [channelId, setChannelId] = useState<string>('');
  const [relatedVideos, setRelatedVideos] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const videoId = useParams().id;

  useEffect(() => {
    youtubeVideoinfo(videoId)
      .then((el: any) => {
        document.title = `${el.data.title} - YouTube`;
        setValue(el.data)
        setChannelId(el.data.channelId)

      })
    return function cleanTitle() { document.title = 'YouTube' }
  }, [])
  useEffect(() => {
    setIsLoading(true);
    youtubeRelatedVideos(`${videoId}`)
      .then((element) => {
        setIsLoading(false)
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
          <Link to={`/channel/${channelId}`}>
            <div className={styles['video-channel-wrapper']}>
              <AccountCircleIcon />
              <Typography className={styles['video-channel-title']}>{value.channelTitle}</Typography>
            </div>
          </Link>
          <Typography className={styles['video-viewers']}>{moment(value.publishDate).locale('ru').format('MM to LL')}</Typography>
        </div>
      </div>
      <div className={styles['video-recomendation']}>
        {isLoading ? <CircularProgress /> : relatedVideos.map((el: any) => (
          <RecomendedVideoItem key={el.videoId} data={el} />
        ))
        }
      </div>
    </div>
  );
}

export default Videopage;