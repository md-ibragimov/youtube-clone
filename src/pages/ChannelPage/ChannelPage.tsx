import styles from './ChannelPage.module.scss';
import youtubeChannelInfo from '../../api/youtube-channel-info';
import CircularProgress from '@mui/material/CircularProgress';
import HomeVideoItem from '../../components/HomeVideoItem/HomeVideoItem';
import { Container, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

function ChannelPage({ }) {
  const handleVideos = () => {
    if (channelVideo.length) {
      setIsNextLoading(true);
      youtubeChannelInfo(id, nextToken)
        .then((el) => {
          setIsNextLoading(false);
          setChannelVideo((prevArray: any) => [...prevArray, ...el.data.data]);
          setNextToken(el.data.continuation);
        })
    }
  }
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const { id } = useParams() as any;
  const [nextToken, setNextToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isNextLoading, setIsNextLoading] = useState<Boolean>(false);
  const [channelVideo, setChannelVideo] = useState<any>([]);
  const [channelTitle, setChannelTitle] = useState<string>('');
  const [channelSubscribers, setChannelSubscribers] = useState<string>('');
  const [channelLogoLink, setChannelLogoLink] = useState<string>('');
  const [channelPreviewLink, setChannelPreviewLink] = useState<string>('');
  useEffect(() => {
    if (inView) {
      handleVideos();
    }
  }, [inView])
  useEffect(() => {
    console.log(true)
    setIsLoading(true);
    youtubeChannelInfo(id)
      .then((el) => {
        document.title = `${el.data.meta.title} - YouTube`;
        setIsLoading(false);
        setNextToken(el.data.continuation);
        setChannelLogoLink(el.data.meta.thumbnail[1].url.replace('yt3.ggpht.com', 'yt3.googleusercontent.com'));
        setChannelPreviewLink(el.data.meta.image.banner[1].url.replace('yt3.ggpht.com', 'yt3.googleusercontent.com'));
        setChannelTitle(el.data.meta.title);
        setChannelSubscribers(el.data.meta.subscriberCount);
        setChannelVideo(el.data.data);

      })
    return function cleanTitle() { document.title = 'YouTube' }
  }, [id])
  return (
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
      <Container className={styles.container} >
        <div
          className={styles['channel-preview']}
          style={{
            background: `url(${channelPreviewLink}) no-repeat no-repeat center`,
          }}
        ></div>
        <div className={styles['channel-info']}>
          <img
            className={styles['channel-info-logo']}
            src={channelLogoLink}
            alt=""
          />
          <div className={styles['channel-info-text']}>
            <Typography className={styles['channel-title']}>{channelTitle}</Typography>
            <Typography className={styles['channel-subscribers']}>{channelSubscribers} подписчиков</Typography>
          </div>
        </div>
        <div className={styles['channel-videos-wrapper']}>
          {channelVideo.map((videoData: any) => (
            <HomeVideoItem key={videoData.videoId} data={videoData} />
          ))}
          <div ref={ref} style={{ width: '100%', height: '1px' }}></div>
          {isNextLoading && <CircularProgress />}
        </div>
      </Container >
  );
}

export default ChannelPage;