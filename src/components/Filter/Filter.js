import React from 'react';
import PropTypes from 'prop-types';

export function Filter({ changeFilter }) {
  return (
    <div>
      <label>
        Find contacts by name
        <input
          type="text"
          name="filter"
          placeholder="Enter your search"
          onChange={changeFilter}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  changeFilter: PropTypes.func.isRequired,
};
