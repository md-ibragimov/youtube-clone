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
    <Link to={`/watch/${dataInfo.id.videoId}`}>
      <div className={styles.container}>
        <img
          src={dataInfo.snippet.thumbnails.medium.url}
          width={dataInfo.snippet.thumbnails.medium.width}
          height='100px'
          alt="video preview"
          className={styles['video-preview']}
        />
        <div className={styles['video-info']}>
          <Typography className={styles['video-name']}>{dataInfo.snippet.title}</Typography>
          <Typography
            className={styles['video-publish-date']}
            style={{ color: grayColor('.7') }}
          >{publishDate.format('MM to LL')}</Typography>
          <div className={styles['video-channel']}>
            <AccountCircleIcon />
            <Typography style={{
              color: grayColor('.7')
            }}
              className={styles['channel-name']}
            >{dataInfo.snippet.channelTitle}</Typography>
          </div>
          <Typography
            className={styles['video-description']}
            style={{
              color: grayColor('.7')
            }}
          >{dataInfo.snippet.description}</Typography>
        </div>
      </div>
    </Link>
  );
}

export default VideoItem;