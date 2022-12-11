import styles from './Header.module.scss';
import Toolbar from '@mui/material/Toolbar';
import Search from '../Search/Search';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Box, AppBar } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import YouTubeLink from '../YouTubeLink/YouTubeLink';

interface IsetCurrentColor {
  currentColor: string,
  setCurrentColor: Dispatch<SetStateAction<string>>
}

function Header({ currentColor, setCurrentColor }: IsetCurrentColor) {
  const localStorageWrite = () => {
    localStorage.setItem('theme', currentColor === 'dark' ? 'light' : 'dark')
  }
  return (
    <Box
      className={styles.container}
      sx={{ flexGrow: 1 }}
    >
      <AppBar
        position="fixed"
        className={styles.header}
      >
        <Toolbar className={styles.toolbar}>
          <YouTubeLink />
          <Search
          />
          <IconButton onClick={() => {
            currentColor === 'dark' ? setCurrentColor('light') : setCurrentColor('dark');
            localStorageWrite();
          }}>
            <Brightness4Icon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;