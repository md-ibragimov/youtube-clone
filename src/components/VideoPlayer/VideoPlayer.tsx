import React from 'react';
import styles from './VideoPlayer.module.scss';

interface IVideo {
  videoId: string | undefined
}

const VideoPlayer: React.FC<IVideo> = ({ videoId }) => {
  return (
    <div className={styles['video-responsive']}>
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}

export default VideoPlayer;