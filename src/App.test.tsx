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

test('clear grid poles reduces pole count to zero', () => {
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();
  expect(grid.getPoles().length).toBe(1);

  grid.clearPoles()
  expect(grid.getPoles().length).toBe(0);
});

test('after adding a second pole, they both have connections to each other', () => {
  // add first pole
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();
  expect(grid.getPoles().length).toBe(1);
  expect(pole1.connections.length).toBe(0)

  // add second pole
  const pole2 = new Pole(1, 1)
  const addPole2 = grid.addPole(pole2)
  expect(addPole2).toBeTruthy();
  expect(grid.getPoles().length).toBe(2);

  // main asserts
  expect(pole1.connections.length).toBe(1)
  expect(pole1.connections[0]).toBe(pole2)
  expect(pole2.connections.length).toBe(1)
  expect(pole2.connections[0]).toBe(pole1)
});

test('pole added past max distance does not create connections', () => {
  // add first pole
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();
  expect(grid.getPoles().length).toBe(1);
  expect(pole1.connections.length).toBe(0)

  // add second pole
  const pole2 = new Pole(0, 9)
  const addPole2 = grid.addPole(pole2)
  expect(addPole2).toBeTruthy();
  expect(grid.getPoles().length).toBe(2);

  // main asserts
  expect(pole1.connections.length).toBe(0)
  expect(pole2.connections.length).toBe(0)
});

test('poles become connected with third pole added in middle', () => {
  // add first pole
  const grid = new Grid()
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();
  expect(grid.getPoles().length).toBe(1);
  expect(pole1.connections.length).toBe(0)

  // add second pole
  const pole2 = new Pole(5, 5)
  const addPole2 = grid.addPole(pole2)
  expect(addPole2).toBeTruthy();
  expect(grid.getPoles().length).toBe(2);
  expect(pole1.connections.length).toBe(0)
  expect(pole2.connections.length).toBe(0)

  // add third pole
  const pole3 = new Pole(2, 2)
  const addPole3 = grid.addPole(pole3)
  expect(addPole3).toBeTruthy();
  expect(grid.getPoles().length).toBe(3);

  // main asserts
  expect(pole1.connections.length).toBe(1)
  expect(pole2.connections.length).toBe(1)
  expect(pole3.connections.length).toBe(2) // middle pole
});

test('no pole has more than five connections to other poles', () => {
  const grid = new Grid()
  const poles = []

  /*
  create poles in an arrangment like:
  o..o
  ...o
  ...o
  oooo

  such that the pole at 0,0 could have seven connections if there were no logic
  limiting the connections
  */
  var pole = new Pole(0, 0)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(3, 0)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(3, 1)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(3, 2)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(3, 3)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(2, 3)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(1, 3)
  grid.addPole(pole)
  poles.push(pole)
  pole = new Pole(0, 3)
  grid.addPole(pole)
  poles.push(pole)

  for (let pole of poles) {
    expect(pole.connections.length).toBeLessThanOrEqual(5)
  }

});