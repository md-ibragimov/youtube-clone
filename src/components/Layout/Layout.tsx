import Header from "../Header/Header";
import styles from './Layout.module.scss';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from "@mui/material";

function Layout({ }) {
  const [currentColor, setCurrentColor] = useState<any>(localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light');

  const theme = createTheme({
    palette: {
      mode: currentColor,
      primary: {
        main: '#F00000',
      },
      secondary: {
        main: '#f74a4d',
      },
      success: {
        main: '#00ff0a',
      },
      error: {
        main: '#ff1100',
      },
    },
  })
  return (
      <div className={styles.container}>
        <ThemeProvider
          theme={theme}
        >
          <CssBaseline />
          <Header
            currentColor={currentColor}
            setCurrentColor={setCurrentColor}
          />
          <Outlet />
        </ThemeProvider >
      </div>
  );
}

export default Layout;