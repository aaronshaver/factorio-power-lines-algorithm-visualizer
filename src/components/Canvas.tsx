import React, { useRef, useEffect } from 'react';
import Grid from '../Grid'
import Pole from '../Pole'

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

    const drawNewPole = (pole: Pole) => {
        const drawX = pole.x * squareSize + squareSize * 0.25
        const drawY = pole.y * squareSize + squareSize * 0.25
        const poleSize = squareSize * 0.5

        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                console.log("hi")
                context.fillStyle = "red";
                context.fillRect(drawX, drawY, poleSize, poleSize);
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
            console.log(grid.getPoles())
            drawNewPole(pole)
        }
    }

    return <canvas ref={canvasRef} width="800" height="800" onClick={handleClick}></canvas>;
}

export default Canvas;