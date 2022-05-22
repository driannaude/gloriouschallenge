import React, { useState } from 'react';
import {
  useTheme,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

interface SearchBoxProps {
  placeholderText: string;
  buttonText: string;
  onSubmit: (address: string) => void;
}

const SearchBoxComponent: React.FC<SearchBoxProps> = ({
  buttonText,
  placeholderText,
  onSubmit,
}) => {
  // State
  const [query, setQuery] = useState('');

  // Hooks
  const theme = useTheme();

  // Handlers
  const onUpdateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || '');
  };

  const onSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={onSubmitSearch}>
      <FormControl variant="outlined" fullWidth>
        <InputLabel htmlFor="outlined-adornment-search">
          {placeholderText}
        </InputLabel>
        <OutlinedInput
          id="search-box"
          type="text"
          label={placeholderText}
          onChange={onUpdateQuery}
          value={query}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="submit form"
                onClick={onSubmitSearch}
                edge="end"
              >
                <FontAwesomeIcon icon={faSearch} size="xs" />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  );
};

export const SearchBox = React.memo(SearchBoxComponent);
