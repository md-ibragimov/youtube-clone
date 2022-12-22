import React from 'react';
import styles from './HomeVideoItem.module.scss';
import numbro from 'numbro';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const HomeVideoItem: React.FC<any> = ({ data }) => {
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
        <div
          className={styles['video-preview-wrapper']}
        >
          <div
            className={styles['video-preview']}
            style={{
              background: `url(${data.thumbnail[3].url}) no-repeat no-repeat center`,
              backgroundSize: 'cover',
            }}
          ></div>
          <div className={styles['video-duration']}>{data.lengthText}</div>
        </div>
        <div className={styles['video-info']}>
          <Typography className={styles['video-title']}>{data.title}</Typography>
          <Typography
            className={styles['other-info']}
            style={{ color: grayColor('.7') }}
          >{viewersCount} просмотров ⋅ {data.publishedText}</Typography>
        </div>
      </div>
    </Link>
  );
}

export default HomeVideoItem;