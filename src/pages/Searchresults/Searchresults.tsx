import youtubeSearch from '../../api/youtube-search';
import styles from './Searchresults.module.scss';
import ChannelItem from '../../components/ChannelItem/ChannelItem';
import VideoItem from '../../components/VideoItem/VideoItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { v4 } from 'uuid';



function Searchresults({ }) {
  const { ref, inView } = useInView({
    threshold: 0,
  })
  const { searchrequest } = useParams() as any;
  const [pageToken, setPageToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [isLazyLoading, setIsLazyLoading] = useState<Boolean>(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);

  useEffect(() => {
    if (inView) handleVideos();
  }, [inView])
  const handleVideos = () => {
    if (searchResult.length) {
      setIsLazyLoading(true);
      youtubeSearch(searchrequest, pageToken).then(el => {
        if (pageToken !== el.data.nextPageToken) {
          setSearchResult((prevValue) => [...prevValue, ...el.data.items]);
          setPageToken(el.data.nextPageToken);
          setIsLazyLoading(false);
        }

      })
    }
  }
  useEffect(() => {
    document.title = `${searchrequest} - YouTube`;
    setIsLoading(true);
    youtubeSearch(searchrequest).then(el => {
      setSearchResult([...el.data.items]);
      setPageToken(el.data.nextPageToken);
      setIsLoading(false)
    })
    return function cleanTitle() { document.title = 'YouTube' }
  }, [searchrequest])
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>

        {isLoading ? <CircularProgress sx={{ margin: '0 auto' }} /> : searchResult.map(el => (
          el.id.kind === 'youtube#channel' ?
            <ChannelItem dataInfo={el} key={el.id.channelId + v4()} /> :
            <VideoItem dataInfo={el} key={el.id.videoId + v4()} />
        ))}
        <div ref={ref} style={{ width: '50px', height: '50px', opacity: 0 }} >123</div>
        {isLazyLoading && <CircularProgress />}
      </Container >
    </div >
  );
}

export default Searchresults;