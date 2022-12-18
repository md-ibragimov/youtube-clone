import youtubeSearch from '../../api/youtube-search';
import styles from './Searchresults.module.scss';
import ChanelItem from '../../components/ChannelItem/ChannelItem';
import VideoItem from '../../components/VideoItem/VideoItem';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from '@mui/material';




function Searchresults({ }) {
  const { searchrequest } = useParams() as any;
  const [pageToken, setPageToken] = useState<string>('');
  const [searchResult, setSearchResult] = useState<any[]>([]);


  useEffect(() => {
    document.title = `${searchrequest} - YouTube`;
    youtubeSearch(searchrequest).then(el => {
      setSearchResult([...el.data.items]);
      setPageToken(el.data.nextPageToken);
    });
    return function cleanTitle() { document.title = 'YouTube' }
  }, [searchrequest])
  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        {searchResult.map(el => (
          el.id.kind === 'youtube#channel' ?
            <ChanelItem dataInfo={el} key={el.id.channelId} /> :
            <VideoItem dataInfo={el} key={el.id.videoId} />
        ))}
      </Container>
    </div>
  );
}

export default Searchresults;