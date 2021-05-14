import TileGenerator from "./TileGenerator";

const length = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;

export const GridGenerator = (square = 6, boardHeight = 720, boardWidth = length) => {
    let grid = Array.from(Array(square), () => new Array(square));

    let sideLength = boardWidth / square;
    
    let enemyCount = 0;
    let id = 0;
    for (let y = 0; y < square; y++) 
        for (let x = 0; x < square; x++) {
            id++;
            let newTile = TileGenerator(sideLength, x, y, -1, id);
            if (newTile.tileType === "enemy")
                enemyCount++;
            grid[y][x] = newTile;
        }
            
    return grid;
};

export default GridGenerator;