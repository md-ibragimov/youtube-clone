import Typography from "@mui/material/Typography/Typography";
import { useEffect } from "react";
import styles from './VideoItem.module.scss';
import { useTheme } from '@mui/material/styles';


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
  useEffect(() => {
    console.log(dataInfo)
  }, [])
  return (
    <div className={styles.container}>
      <img
        src={dataInfo.snippet.thumbnails.medium.url}
        width={dataInfo.snippet.thumbnails.medium.width}
        alt="video preview"
        className={styles['video-preview']}
      />
      <div className={styles['video-info']}>
        <Typography className={styles['video-name']}>{dataInfo.snippet.title}</Typography>
        <Typography className={styles['video-publish-date']}></Typography>
        <div className={styles['video-channel']}></div>
        <Typography
          className={styles['video-description']}
          style={{
            color: `${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .7)' : 'rgba(0, 0, 0, .7)'}`
          }}
        >{dataInfo.snippet.description}</Typography>
      </div>
    </div>
  );
}

export default VideoItem;