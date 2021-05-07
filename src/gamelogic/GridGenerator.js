import TileGenerator from "./TileGenerator";

export const GridGenerator = (gridY = 8, gridX = 8, boardHeight = 720, boardWidth = 720) => {
    let grid = Array.from(Array(gridY), () => new Array(gridX));

    let tileWidth = boardWidth / gridX;
    let tileHeight = boardHeight / gridY;
    
    let enemyCount = 0;
    
    for (let y = 0; y < gridY; y++) 
        for (let x = 0; x < gridX; x++) {
            let newTile = TileGenerator(tileWidth, tileHeight, x, y);
            if (newTile.tileType === "enemy")
                enemyCount++;
            grid[y][x] = newTile;
        }
            
    return grid;
};

export default GridGenerator;