import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders intro text', () => {
  render(<App />);
  const introText = screen.getByText(/Factorio-style Power Line Algorithm Visualizer/i);
  expect(introText).toBeInTheDocument();
});

test('renders algorithm radio buttons texts', () => {
  render(<App />);
  var text = screen.getByText(/Algorithm:/i);
  expect(text).toBeInTheDocument();
  text = screen.getByText(/All/i);
  expect(text).toBeInTheDocument();
  text = screen.getByText(/No diagonals/i);
  expect(text).toBeInTheDocument();
});

test('renders Clear button text', () => {
  render(<App />);
  var text = screen.getByText(/Clear/i);
  expect(text).toBeInTheDocument();
});
