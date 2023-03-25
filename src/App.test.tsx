import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Snake/i);
  expect(linkElement).toBeInTheDocument();
});
