import Container from '@mui/material/Container';
import styles from './Notfoundpage.module.scss';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

function Notfoundpage({ }) {
  useEffect(() => {
    document.title = '404 Not Found';
    return function cleanTitle() {document.title = 'YouTube'}
  }, [])
  return (
    <Container
      className={styles.container}
    >
      <div className={styles.notfoundimage} />
      <Typography
        className={styles['error-text']}
      >Эта страница недоступна, вернитесь на <Link to='/' className={styles['error-link']}>Главную</Link></Typography>
    </Container>
  );
}

export default Notfoundpage;