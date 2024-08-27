import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SearchTextField = ({ placeholder, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit(searchTerm.trim());
    } else {
      console.error('onSubmit is not a function');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        id="search-input"
        name="search-input"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        style={{
          padding: '8px',
          marginRight: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          minWidth: '200px',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '8px 16px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

SearchTextField.propTypes = {
  placeholder: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

SearchTextField.defaultProps = {
  placeholder: 'Enter your search term...',
};

export default SearchTextField;
