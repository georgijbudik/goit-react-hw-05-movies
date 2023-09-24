import { useState } from 'react';

const SearchBox = ({ onSubmit, onChange }) => {
  const [query, setQuery] = useState('');
  const handleSubmit = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return;
    }
    onSubmit(query);
    setQuery('');
  };

  const handleChange = e => {
    const newValue = e.target.value;
    onChange(newValue);
    setQuery(newValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="query" value={query} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
