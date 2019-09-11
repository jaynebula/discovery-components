import React, { useContext, useState, useEffect } from 'react';
import { Search as CarbonSearchInput } from 'carbon-components-react';
import { SearchContext } from '../DiscoverySearch/DiscoverySearch';
import useDebounce from '../../utils/useDebounce';

interface SearchInputProps {
  small: boolean;
}

export const SearchInput: React.SFC<SearchInputProps> = ({ small }) => {
  const searchContext = useContext(SearchContext);
  const [value, setValue] = useState(searchContext.searchParameters.natural_language_query || '');
  const handleOnChange = (evt: React.SyntheticEvent<EventTarget>): void => {
    const target = evt.currentTarget as HTMLInputElement;
    setValue(target.value);
  };
  const debouncedSearchTerm = useDebounce(value, 500);
  useEffect(() => {
    searchContext.onUpdateNaturalLanguageQuery(value);
  }, [debouncedSearchTerm]);
  const handleOnKeyUp = (evt: React.KeyboardEvent<EventTarget>): void => {
    if (evt.key === 'Enter') {
      searchContext.onUpdateNaturalLanguageQuery(value);
      searchContext.onSearch();
    }
  };

  return (
    <CarbonSearchInput
      small={small}
      onKeyUp={handleOnKeyUp}
      onChange={handleOnChange}
      value={value}
    />
  );
};
