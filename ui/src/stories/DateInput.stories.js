import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import DateInput from '../components/DateInput';

export default storiesOf('DateInput', module)
  .add('base', () => {
    const [date, setDate] = useState();
    return (
      <div class="max-w-md">
        <DateInput
          selected={date}
          onChange={(val) => setDate(val)}
          label="Your Birthday"
          name="birthday"
        ></DateInput>
      </div>
    );
  })
  .add('without label', () => (
    <div class="max-w-md">
      <DateInput></DateInput>
    </div>
  ));
