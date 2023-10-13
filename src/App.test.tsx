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

test('renders Clear button text', () => {
  render(<App />);
  var text = screen.getByText(/Clear/i);
  expect(text).toBeInTheDocument();
});

test('grid with poles contains poles', () => {
  const grid = new Grid(5, 7)
  const pole1 = new Pole(0, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(0, 1)
  grid.addPole(pole2)

  expect(grid.getPoles().length).toBe(2);
});

test('adding a pole where one already exists does not add second pole to grid', () => {
  const grid = new Grid(5, 7)
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();

  const pole2 = new Pole(0, 0) // intentional same location
  const addPole2 = grid.addPole(pole2)
  expect(addPole2).toBeFalsy();

  expect(grid.getPoles().length).toBe(1);
});

test('clear grid poles reduces pole count to zero', () => {
  const grid = new Grid(5, 7)
  const pole1 = new Pole(0, 0)
  const addPole1 = grid.addPole(pole1)
  expect(addPole1).toBeTruthy();
  expect(grid.getPoles().length).toBe(1);

  grid.clearPoles()
  expect(grid.getPoles().length).toBe(0);
});

test('after adding a second pole, they both have connections to each other', () => {
  // add first pole
  const grid = new Grid(5, 7)
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
  const grid = new Grid(5, 7)
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
  const grid = new Grid(5, 7)
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
  const grid = new Grid(5, 7)
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

test('Maximal (avoid diagonal) does not create diagonal connections', () => {
  const grid = new Grid(5, 7, 'Maximal (avoid diagonals)')
  const poles = []

  /*
  create poles in an arrangment like:
  o.o
  ...
  ..o

  such that the poles between 0,0 and 2,2 would have a diagonal connection if
  the algorithm were not working
  */
  const pole1 = new Pole(0, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(2, 0)
  grid.addPole(pole2)
  const pole3 = new Pole(2, 2)
  grid.addPole(pole3)

  expect(pole1.connections.length).toBe(1)
  expect(pole2.connections.length).toBe(2)
  expect(pole3.connections.length).toBe(1)
  expect(pole1.connections[0].x).toBe(2)
  expect(pole1.connections[0].y).toBe(0)
  expect(pole3.connections[0].x).toBe(2)
  expect(pole3.connections[0].y).toBe(0)
});

test('Maximal (avoid diagonal) will create diagonal if it has to', () => {
  const grid = new Grid(5, 7, 'Maximal (avoid diagonals)')
  const poles = []

  /*
  create poles in an arrangment like:
  o..
  ...
  ..o

  such that the poles between 0,0 and 2,2 should have a diagonal connection if
  the algorithm is working
  */
  const pole1 = new Pole(0, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(2, 2)
  grid.addPole(pole2)

  expect(pole1.connections.length).toBe(1)
  expect(pole2.connections.length).toBe(1)
  expect(pole1.connections[0].x).toBe(2)
  expect(pole1.connections[0].y).toBe(2)
  expect(pole2.connections[0].x).toBe(0)
  expect(pole2.connections[0].y).toBe(0)
});

test('Minimal creates exactly three wires for grid of four nodes', () => {
  const grid = new Grid(5, 7, 'Minimal')
  const poles = []

  /*
  create poles in an arrangment like:
  o.o
  ...
  o.o

  such that the poles should have exactly three wires; there are several
  way to get those three
  */
  const pole0 = new Pole(0, 0)
  grid.addPole(pole0)
  const pole1 = new Pole(2, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(2, 2)
  grid.addPole(pole2)
  const pole3 = new Pole(0, 2)
  grid.addPole(pole3)

  var count = 0
  count = count + pole0.connections.length
  count = count + pole1.connections.length
  count = count + pole2.connections.length
  count = count + pole3.connections.length
  expect(count).toBe(6) // three wires, but doubled because connections are added bi-directionally
});

test('Minimal (avoid diagonals) does not create diagonals for [0,0 2,0 2,2]', () => {
  const grid = new Grid(5, 7, 'Minimal (avoid diagonals)')
  const poles = []

  /*
  create poles in an arrangment like:
  o.o
  ...
  ..o

  such that the poles between 0,0 and 2,2 could have a diagonal connection if
  the algorithm were not working
  */
  const pole1 = new Pole(0, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(2, 0)
  grid.addPole(pole2)
  const pole3 = new Pole(2, 2)
  grid.addPole(pole3)

  expect(pole1.connections.length).toBe(1)
  expect(pole2.connections.length).toBe(2)
  expect(pole3.connections.length).toBe(1)
  expect(pole1.connections[0].x).toBe(2)
  expect(pole1.connections[0].y).toBe(0)
  expect(pole3.connections[0].x).toBe(2)
  expect(pole3.connections[0].y).toBe(0)
});

test('Minimal (avoid diagonals) does not create diagonals for [0,0 2,0 1,1]', () => {
  const grid = new Grid(5, 7, 'Minimal (avoid diagonals)')
  const poles = []

  /*
  create poles in an arrangment like:
  o.o
  ...
  ..o

  such that the poles between 0,0 and 2,2 could have a diagonal connection if
  the algorithm were not working
  */
  const pole0 = new Pole(0, 0)
  grid.addPole(pole0)
  const pole1 = new Pole(2, 0)
  grid.addPole(pole1)
  const pole2 = new Pole(1, 1)
  grid.addPole(pole2)

  var count = 0
  count = count + pole0.connections.length
  count = count + pole1.connections.length
  count = count + pole2.connections.length
  expect(count).toBe(4) // two wires, but doubled because connections are added bi-directionally
});