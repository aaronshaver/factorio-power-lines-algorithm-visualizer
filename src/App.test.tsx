import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const introText = screen.getByText(/Factorio-style Power Line Algorithm Visualizer/i);
  expect(introText).toBeInTheDocument();
});
