import React from 'react';

function Form({ onSubmit = () => {}, children }) {
  const submitForm = (e) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <form className="form" onSubmit={submitForm}>
      {children}
    </form>
  );
}

export default Form;
