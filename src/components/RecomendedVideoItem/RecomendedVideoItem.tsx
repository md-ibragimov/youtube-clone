import React from 'react';
import styles from './RecomendedVideoItem.module.scss';
import numbro from 'numbro';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const RecomendedVideoItem: React.FC<any> = ({ data }) => {

  const theme = useTheme();
  const grayColor = (value: string) => {
    return theme.palette.mode === 'dark' ? `rgba(255, 255, 255, ${value})` : `rgba(0, 0, 0, ${value})`
  }

  const viewersCount = numbro(data.viewCount).format({
    spaceSeparated: true,
    average: true,

  })
  return (
    <Link to={`/watch/${data.videoId}`}>
      <div className={styles.container}>
        <div className={styles['video-image-wrapper']}>
          <div
            style={{
              background: `url(${data.thumbnail[1].url}) no-repeat no-repeat center`,

            }}
            className={styles['video-image']}
          />
          <div className={styles['video-duration']}>{data.lengthText}</div>
        </div>
        <div className={styles['video-info']}>
          <Typography className={styles['video-title']}>{data.title}</Typography>
          <Link to={`/channel/${data.channelId}`}>
            <Typography
              style={{
                color: `${grayColor('.7')}`
              }}
              className={styles['channel-title']}
            >{data.channelTitle}</Typography>
          </Link>
          <Typography
            style={{
              color: `${grayColor('.7')}`
            }}
            className={styles['video-views']}
          >{viewersCount} просмотров</Typography>
          <Typography
            style={{
              color: `${grayColor('.7')}`
            }}
            className={styles['video-published']}
          >{data.publishedTimeText}</Typography>
        </div>
      </div>
    </Link>
  );
}

export default RecomendedVideoItem;