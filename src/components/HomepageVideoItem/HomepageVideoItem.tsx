import React, { useEffect } from 'react';
import numbro from 'numbro';
import styles from './HomepageVideoItem.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


interface IVideoItem {
  videoInfo: {
    videoId: string,
    title: string,
    type: string,
    author: string,
    authorId: string,
    authorUrl: string,
    description: string,
    viewCount: string,
    published: Number
    publishedText: string
    lengthSeconds: Number
    timeText: string
    isVerified: Boolean,
    videoThumbnails: Array<any>
  }
}

const HomepageVideoItem: React.FC<IVideoItem> = ({ videoInfo }) => {
  const viewersCount = numbro(videoInfo.viewCount).format({
    spaceSeparated: true,
    average: true,

  })
  const theme = useTheme();
  const grayColor = (value: string) => {
    return theme.palette.mode === 'dark' ? `rgba(255, 255, 255, ${value})` : `rgba(0, 0, 0, ${value})`
  }
  return (
    <div className={styles.container}>
      <div className={styles['video-preview-wrapper']}>
        <Link to={`/watch/${videoInfo.videoId}`}>
          <div
            className={styles['video-preview']}
            style={{
              background: `url(${videoInfo.videoThumbnails[3].url}) no-repeat no-repeat center`
            }}
          />
        </Link>
        <Typography className={styles['video-duration']}>{videoInfo.timeText}</Typography>
      </div>
      <div className={styles['video-info-wrapper']}>
        <Link to={`/watch/${videoInfo.videoId}`}> <Typography className={styles['video-name']}>{videoInfo.title.slice(0, 50)}</Typography></Link>
        <Link to={`/channel/${videoInfo.authorId}`}>
          <div className={styles['video-channel-wrapper']}>
            <AccountCircleIcon />
            <Typography
              className={styles['video-channel']}
              style={{
                color: `${grayColor('.7')}`
              }}>{videoInfo.author}</Typography>
            <div className={styles.isVerified}>{videoInfo.isVerified && <VerifiedIcon />}</div>
          </div>
        </Link>
        <Typography style={{
          color: `${grayColor('.7')}`
        }} className={styles['video-viewers']}>{viewersCount} просмотров</Typography>
        <Typography style={{
          color: `${grayColor('.7')}`
        }} className={styles['video-publish-date']}>{videoInfo.publishedText}</Typography>
      </div>
    </div>
  );
}

export default HomepageVideoItem;