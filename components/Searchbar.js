import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import FancyButton from './FancyButton';

const SearchTextField = ({ placeholder, onSubmit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const formRef = useRef(null);

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

  const handleFancyButtonClick = () => {
    if (formRef.current) {
      const event = new Event('submit', { cancelable: true, bubbles: true });
      formRef.current.dispatchEvent(event);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
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
      <FancyButton onClick={handleFancyButtonClick}>
        Search
      </FancyButton>
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
