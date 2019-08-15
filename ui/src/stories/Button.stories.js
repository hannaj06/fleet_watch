import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs';
import Button from '../components/Button';

const kinds = ['confirm', 'action', 'delete'];

const stories = storiesOf('Button', module).add(
  'base',
  () => {
    const content = text('Content', 'Tweak me');
    const small = boolean('Small?', false);
    const disabled = boolean('Disabled?', false);
    const kind = select('Kind', ['confirm', 'action', 'delete'], 'confirm');
    return (
      <>
        <div className="my-2">
          <Button>Hello</Button>
          <Button small>Hello</Button>
          {kinds.map((kind) => (
            <div className="my-4">
              <Button kind={kind}>
                {kind.charAt(0).toUpperCase() + kind.slice(1)}
              </Button>
              <Button kind={kind} disabled>
                Disabled: {kind.charAt(0).toUpperCase() + kind.slice(1)}
              </Button>
              <Button kind={kind} small>
                {kind.charAt(0).toUpperCase() + kind.slice(1)}
              </Button>
              <Button kind={kind} small disabled>
                Disabled: {kind.charAt(0).toUpperCase() + kind.slice(1)}
              </Button>
            </div>
          ))}
        </div>
        <div>
          <Button kind={kind} small={small} disabled={disabled}>
            {content}
          </Button>
        </div>
      </>
    );
  },
  {
    notes: 'Use buttons to trigger actions',
  }
);

stories.addDecorator(withKnobs);

export default stories;
