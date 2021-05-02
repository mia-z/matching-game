import TileTypeGenerator from "./TileTypeGenerator";

export const GridGenerator = (gridY = 12, gridX = 8, boardHeight = 720, boardWidth = 600) => {
    let grid = Array.from(Array(gridY), () => new Array(gridX));

    let tileWidth = boardWidth / gridX;
    let tileHeight = boardHeight / gridY;
    
    for (let y = 0; y < gridY; y++) 
        for (let x = 0; x < gridX; x++) 
            grid[y][x] = 
            {
                width: tileWidth,
                height: tileHeight,
                selfX: x,
                selfY: y,
                tileType: TileTypeGenerator(),
                isActive: false,
                joiningStyle: "dot"
            }
            
    return grid;
};

export default GridGenerator;