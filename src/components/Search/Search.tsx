import styles from './Search.module.scss';
import Box from '@mui/material/Box';
import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Search({ }) {
  const [value, setValue] = useState<string>('')
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    value.trim() && navigate(`/search/${value}`);
  }

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
        />
      </form>
    </Box>

  );
}

export default Search;