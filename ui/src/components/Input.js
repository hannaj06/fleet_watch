import React from 'react';

function Input({
  showLabel = true,
  textRight = false,
  name,
  label,
  placeholder,
  type = 'text',
  autofocus,
  required,
  disabled,
  children,
  ...rest
}) {
  return (
    <>
      <label
        aria-label={label}
        className={`${showLabel ? 'form-label' : 'visually-hidden'}`}
        htmlFor={name}
      >
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          className={`form-input ${textRight ? 'text-right' : ''}`}
          id={name}
          type={type}
          name={name}
          autofocus={autofocus}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          {...rest}
        />
      )}
    </>
  );
}

export default Input;
