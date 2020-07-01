import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

test('renders title of the website', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/the start of the journey/i);
  expect(linkElement).toBeInTheDocument();
});