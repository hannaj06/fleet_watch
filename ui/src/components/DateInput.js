import React from 'react';
import Input from './Input';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DateInput({
  showLabel = true,
  textRight = false,
  name,
  label,
  selected,
  onChange,
}) {
  return (
    <Input name={name} label={label} showLabel={showLabel}>
      <DatePicker
        className={`form-input ${textRight ? 'text-right' : ''}`}
        name={name}
        showTimeInput
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
        timeCaption="Time: "
        selected={selected}
        onChange={onChange}
      />
    </Input>
  );
}

export default DateInput;
