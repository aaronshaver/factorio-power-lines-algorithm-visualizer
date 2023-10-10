import React, { useRef, useEffect } from 'react';

const gridSize = 16;
const squareSize = 50;
const backgroundColor = '#808080'; // medium gray
const borderColor = '#404040'; // dark gray

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