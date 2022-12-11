import styles from './YouTubeLink.module.scss';
import { Link } from 'react-router-dom';

function YouTubeLink({ }) {
  return (
    <Link
      to='/'
      className={styles.link}
    />
  );
}

export default YouTubeLink;