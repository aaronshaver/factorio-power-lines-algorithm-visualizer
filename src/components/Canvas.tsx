import React, { useRef, useEffect } from 'react';
import Pole from '../Pole'
import Grid from '../Grid'

const BACKGROUND_COLOR = '#4a4a4a'  // Dark gray
const BORDER_COLOR = '#626262'  // Lighter gray
const POLE_UNCONNECTED_COLOR = '#e8474c'  // Muted Red
const POLE_CONNECTED_COLOR = '#6a8eb2'  // Slate Blue
const POWER_LINE_COLOR = '#e8c547'  // Muted Gold

type CanvasProps = {
    grid: Grid
}

const Canvas: React.FC<CanvasProps> = ({ grid }) => {
    const gridSize = grid.GRID_SIZE;
    const squareSize = grid.squareSize;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const drawGrid = (context: CanvasRenderingContext2D) => {
        context.lineWidth = 1
        for (let x = 0; x < gridSize; x++) {
            for (let y = 0; y < gridSize; y++) {
                const posX = x * squareSize;
                const posY = y * squareSize;

                context.fillStyle = BACKGROUND_COLOR;
                context.fillRect(posX, posY, squareSize, squareSize);

                context.strokeStyle = BORDER_COLOR;
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
                        context.fillStyle = POLE_CONNECTED_COLOR;
                    } else {
                        context.fillStyle = POLE_UNCONNECTED_COLOR;
                    }
                    context.fillRect(drawX, drawY, poleSize, poleSize);
                }
            }
        }
    }

    const drawPowerLines = () => {
        const poles = grid.getPoles()
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d')
            if (context) {
                context.strokeStyle = POWER_LINE_COLOR
                context.lineWidth = 3 // power line thickness
                for (let poleFrom of poles) {
                    // if no connection, skip to next pole
                    if (poleFrom.connections.length == 0) continue

                    for (let poleTo of poleFrom.connections) {
                        const startX = poleFrom.x * squareSize + (squareSize * 0.5)
                        const startY = poleFrom.y * squareSize + (squareSize * 0.5)
                        const endX = poleTo.x * squareSize + (squareSize * 0.5)
                        const endY = poleTo.y * squareSize + (squareSize * 0.5)

                        context.beginPath();
                        context.moveTo(startX, startY);
                        // control point for adding a slight curve
                        const curveAmount = 50
                        const controlX = (startX + endX) / 2;
                        const controlY = (startY + endY) / 2 + curveAmount
                        context.quadraticCurveTo(controlX, controlY, endX, endY)

                        context.stroke()
                    }
                }
            }
        }
    }

    const drawConnectedPoleAnchors = () => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                const circleRadius = squareSize * 0.1;  // Set the circle size
                context.fillStyle = '#00008B';  // Dark blue color
                for (let pole of grid.getPoles()) {
                    if (pole.connections.length > 0) {
                        const drawX = pole.x * squareSize + squareSize * 0.5;
                        const drawY = pole.y * squareSize + squareSize * 0.5;
                        context.beginPath();
                        context.arc(drawX, drawY, circleRadius, 0, 2 * Math.PI);
                        context.fill();
                    }
                }
            }
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
        // get the click location, taking canvas offset (from window) into account
        //
        // note: we can't use event.currentTarget.offsetLeft/Top because
        // scrolling in the window breaks things; getBoundingClientRect is more
        // accurate
        const rect = event.currentTarget.getBoundingClientRect();
        const canvasX = event.clientX - rect.left;
        const canvasY = event.clientY - rect.top;

        // convert from pixels to our 0-indexed grid locations
        const x = Math.floor(canvasX / squareSize)
        const y = Math.floor(canvasY / squareSize)

        const pole = new Pole(x, y)
        const addedPole = grid.addPole(pole)

        if (addedPole) {
            drawPoles()
            drawPowerLines()
            drawConnectedPoleAnchors()
        }
    }

    return <canvas ref={canvasRef} width="800" height="800" onClick={handleClick}></canvas>;
}

export default Canvas;