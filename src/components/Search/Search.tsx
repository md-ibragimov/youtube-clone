import React from 'react';
import styles from './Search.module.scss';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

function Search({ }) {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    value.trim() && navigate(`/search/${value}`);
  }
  const theme = useTheme();

  return (
    <Box style={{
      marginLeft: 'auto'
    }}>
      <form
        className={styles['search-form']}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className={styles.search}
          placeholder='Поиск...'
          value={value}
          onChange={e => setValue(e.target.value)}
          style={{
            backgroundColor: theme.palette.mode === 'dark' ? '#404040' : '#C40000'
          }
          }
        />
      </form>
    </Box >

  );
}

export default Search;