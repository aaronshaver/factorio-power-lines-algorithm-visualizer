import React, { useRef, useEffect } from 'react';
import Grid from '../Grid'

const grid = new Grid()
const gridSize = grid.size;
const squareSize = grid.squareSize;
const backgroundColor = '#404040'
const borderColor = '#808080'

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const drawGrid = (context: CanvasRenderingContext2D) => {
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const posX = x * squareSize;
        const posY = y * squareSize;

        context.fillStyle = backgroundColor;
        context.fillRect(posX, posY, squareSize, squareSize);

        context.strokeStyle = borderColor;
        context.strokeRect(posX, posY, squareSize, squareSize);
      }
    }
  };

  useEffect(() => {
    if (canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        drawGrid(context);
      }
    }
  }, []);

  return <canvas ref={canvasRef} width="800" height="800"></canvas>;
}

export default Canvas;