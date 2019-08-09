import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import Input from '../components/Input';

const stories = storiesOf('Input', module).add('base', () => {
  const label = text('Label', 'Your Name');
  const showLabel = boolean('Show Label', true);
  const placeholder = text('Placeholder', 'Name');
  return (
    <div>
      <Input
        label={label}
        showLabel={showLabel}
        name="name"
        placeholder={placeholder}
      ></Input>
    </div>
  );
});

stories.addDecorator(withKnobs);

export default stories;
