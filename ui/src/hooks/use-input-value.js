import { useState } from 'react';

export const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e) => {
      setValue(e.target.value || e.target.innerText);
    },
  };
};

export const useCheckboxValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e) => {
      setValue(e.target.checked);
    },
  };
};

export const useNumberValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  return {
    value,
    onChange: (e) => {
      const { value } = e.target;
      const parsedValue = parseInt(value);
      if (e.target && !isNaN(parsedValue)) {
        setValue(parsedValue);
      } else {
        setValue(0);
      }
    },
  };
};
