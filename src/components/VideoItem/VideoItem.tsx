import styles from './VideoItem.module.scss';
import moment from 'moment';
import 'moment/min/locales';
import Typography from "@mui/material/Typography/Typography";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


interface IData {
  dataInfo: {
    id: {
      kind: string,
      videoId: string
    },
    kind: string,
    snippet: {
      channelId: string,
      channelTitle: string,
      description: string,
      liveBroadcastContent: string,
      publishTime: string,
      publishedAt: string,
      title: string,
      thumbnails: {
        default: {
          url: string,
          width: string,
          height: string
        },
        high: {
          url: string,
          width: string,
          height: string

        },
        medium: {
          url: string,
          width: string,
          height: string
        }
      }
    }
  }

}

const VideoItem: React.FC<IData> = ({ dataInfo }) => {
  const theme = useTheme();
  const publishDate = moment(dataInfo.snippet.publishTime).locale('ru');
  const grayColor = (value: string) => {
    return theme.palette.mode === 'dark' ? `rgba(255, 255, 255, ${value})` : `rgba(0, 0, 0, ${value})`
  }

  return (
    <div className={styles.container}>
      <Link to={`/watch/${dataInfo.id.videoId}`}>
        <img
          src={dataInfo.snippet.thumbnails.medium.url}
          alt="video preview"
          className={styles['video-preview']}
        />
      </Link>
      <div className={styles['video-info']}>
        <Link to={`/watch/${dataInfo.id.videoId}`}>
          <Typography className={styles['video-name']}>
            {dataInfo.snippet.title}</Typography>
        </Link>
        <Typography
          className={styles['video-publish-date']}
          style={{ color: grayColor('.7') }}
        >{publishDate.format('MM to LL')}</Typography>
        <Link
          to={`/channel/${dataInfo.snippet.channelId}`}
          style={{ width: 'max-content' }}
        >
          <div
            className={styles['video-channel']}
          >
            <AccountCircleIcon />
            <Typography style={{
              color: grayColor('.7')
            }}
              className={styles['channel-name']}
            >{dataInfo.snippet.channelTitle}</Typography>
          </div>
        </Link>
        <Typography
          className={styles['video-description']}
          style={{
            color: grayColor('.7')
          }}
        >{dataInfo.snippet.description}</Typography>
      </div>
    </div>
  );
}

export default VideoItem;