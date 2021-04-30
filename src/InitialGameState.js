import React from "react";
import { GameTile } from "./components/GameTile";

const WIDTH = 600;
const HEIGHT = 720;

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}

const generateGrid = () => {
    let grid = Array.from(Array(12), () => new Array(8));

    let tileWidth = WIDTH / 8;
    let tileHeight = HEIGHT / 12;
    
    for (let y = 0; y < 12; y++) 
        for (let x = 0; x < 8; x++) 
            grid[y][x] = <GameTile width={tileWidth} height={tileHeight} selfX={x} selfY={y} value={getRandom(1, 4)} />; 
    
    return grid;
}

export const InitialGameState = {
    GameGrid: generateGrid(),
    StartTile: { x: -1, y: -1 },
    CurrentTile: { x: -1, y: -1 }
}

export default InitialGameState;