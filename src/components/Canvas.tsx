import React, { useRef, useEffect } from 'react';
import Pole from '../Pole'
import Grid from '../Grid'

const backgroundColor = '#404040'
const borderColor = '#808080'

type CanvasProps = {
    grid: Grid
}

const Canvas: React.FC<CanvasProps> = ({ grid }) => {
    const gridSize = grid.size;
    const squareSize = grid.squareSize;
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
    }, [grid]);

    const drawPoles = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                for (let pole of grid.getPoles()) {
                    const drawX = pole.x * squareSize + squareSize * 0.25;
                    const drawY = pole.y * squareSize + squareSize * 0.25;
                    const poleSize = squareSize * 0.5;

                    if (pole.connections.length > 0) {
                        context.fillStyle = "#00ff00";
                    } else {
                        context.fillStyle = "#ff0000";
                    }
                    context.fillRect(drawX, drawY, poleSize, poleSize);
                }
            }
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        // get the click location, taking canvas offset (from window) into account
        const canvasX = event.clientX - event.currentTarget.offsetLeft
        const canvasY = event.clientY - event.currentTarget.offsetTop

        // convert to our 16x16 grid 0-indexed locations
        const x = Math.floor(canvasX / squareSize)
        const y = Math.floor(canvasY / squareSize)

        const pole = new Pole(x, y)
        const addedPole = grid.addPole(pole)

        if (addedPole) {
            drawPoles()
        }
    }

    return <canvas ref={canvasRef} width="800" height="800" onClick={handleClick}></canvas>;
}

export default Canvas;