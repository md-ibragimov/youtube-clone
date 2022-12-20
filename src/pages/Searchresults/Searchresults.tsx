import youtubeSearch from '../../api/youtube-search';
import styles from './Searchresults.module.scss';
import ChannelItem from '../../components/ChannelItem/ChannelItem';
import VideoItem from '../../components/VideoItem/VideoItem';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';




function Searchresults({ }) {
  const { searchrequest } = useParams() as any;
  const [pageToken, setPageToken] = useState<string>('');
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [searchResult, setSearchResult] = useState<any[]>([]);


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
            <ChannelItem dataInfo={el} key={el.id.channelId} /> :
            <VideoItem dataInfo={el} key={el.id.videoId} />
        ))}
        <button onClick={() => {
          youtubeSearch(searchrequest, pageToken).then(el => {
            setSearchResult((prevValue) => [...prevValue, ...el.data.items]);
            setPageToken(el.data.nextPageToken);
          })
        }}> download more</button>
      </Container>
    </div>
  );
}

export default Searchresults;