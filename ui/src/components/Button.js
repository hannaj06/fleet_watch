import React from 'react';

function Button({ small, kind, children, onClick, disabled }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${kind ? kind : ''} ${small ? 'small' : ''}`}
    >
      {children}
    </button>
  );
}

export default Button;
