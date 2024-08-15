"use client"
import { useState } from 'react';
import Select from './com/select/select';

import style from './page.module.css'

const Home = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    { value: '', label: 'Select an option' },
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className={ style.Con}>
      <h1>Select Component Example</h1>
      <Select
        options={options}
        value={selectedValue}
        onChange={handleChange}
      />

      <select
         value="fhfhhfd"
      >

        <options>
                helo
        </options>

        <options>
                myname
        </options>

      </select>
      <p>Selected Value: {selectedValue}</p>
    </div>
  );
};

export default Home;
