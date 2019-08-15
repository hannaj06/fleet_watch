import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { act } from 'react-dom/test-utils'; // ES6

it('renders without crashing', async () => {
  const div = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<App />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});
