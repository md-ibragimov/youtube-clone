import React, { useEffect } from "react";
import styles from './ChannelItem.module.scss';
import { Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';


interface IData {
  dataInfo: {
    id: {
      kind: string,
      channelId: string
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
          url: string
        },
        high: {
          url: string

        },
        medium: {
          url: string
        }
      }
    }
  }

}

const ChannelItem: React.FC<IData> = ({ dataInfo }) => {
  const theme = useTheme();
  const getChannelLogo = (link: string) => {
    return link.replace('yt3.ggpht.com', 'yt3.googleusercontent.com');
  }
  return (
    <Link to={`/channel/${dataInfo.id.channelId}`}>
      <div style={{
        borderBottom: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderTop: `1px solid ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`
      }} className={styles.wrapper} >
        <Container className={styles.container}>
          <div className={styles['logo-wrapper']}><img alt="channel icon" src={getChannelLogo(dataInfo.snippet.thumbnails.default.url)} className={styles['channel-logo']} /></div>
          <div className={styles['channel-description']}>
            <Typography className={styles['channel-description__title']}>{dataInfo.snippet.channelTitle}</Typography>
            <Typography className={styles['channel-description__description']} >{dataInfo.snippet.description}</Typography>
          </div>
        </Container>
      </div >
    </Link>
  );
}

export default ChannelItem;