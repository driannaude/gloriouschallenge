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
  initialValue?: string | null;
  onSubmit: (address: string) => void;
}

const SearchBoxComponent: React.FC<SearchBoxProps> = ({
  initialValue,
  placeholderText,
  onSubmit,
}) => {
  // State
  const [query, setQuery] = useState(initialValue || '');

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
          id="outlined-adornment-search"
          type="text"
          label={placeholderText}
          onChange={onUpdateQuery}
          value={query}
          inputProps={{
            'data-testid': 'search-input',
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                data-testid="search-button"
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
