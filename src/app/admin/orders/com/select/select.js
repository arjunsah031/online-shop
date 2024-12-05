import React from 'react';
import styles from './select.module.css';

const Select = ({ options, onChange, value }) => {
  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.select}
        value={value}
        onChange={onChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
