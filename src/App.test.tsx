import { render, screen } from '@testing-library/react';
import App from './App';
import Grid from './Grid'
import Pole from './Pole';

HTMLCanvasElement.prototype.getContext = jest.fn();

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
  text = screen.getByText(/Maximum without diagonals/i);
  expect(text).toBeInTheDocument();
  text = screen.getByText(/Minimum; prefer no diagonals/i);
  expect(text).toBeInTheDocument();
});

test('renders Clear button text', () => {
  render(<App />);
  var text = screen.getByText(/Clear/i);
  expect(text).toBeInTheDocument();
});

test('grid with poles contains poles', () => {
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(0, 1)
  grid.addPole(pole2)

  expect(grid.getPoles().length).toBe(2);
});

test('adding a pole where one already exists does not add second pole to grid', () => {
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();

  const pole2 = new Pole(0, 0) // intentional same location
  const addPole2 = grid.addPole(pole2)
  expect(addPole2).toBeFalsy();

  expect(grid.getPoles().length).toBe(1);
});