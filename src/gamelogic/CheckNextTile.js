export const CheckNextTile = (selfX, selfY, nextX, nextY, type, grid, existingTiles) => {
    if (existingTiles.some(x => x.selfX === nextX && x.selfY === nextY)) {
        let previousTileIndex = existingTiles.length - 1;
        if (existingTiles[previousTileIndex].selfX === selfX && existingTiles[previousTileIndex].selfY === selfY) {
            return 2; //Is the previous tile
        }
    }

    switch(type) {
        case "sword":
        case "enemy": 
            if (grid[nextY][nextX].tileType === "sword" || grid[nextY][nextX].tileType === "enemy") {
                return 1 //Is a match
            }
        case "shield": 
            if (grid[nextY][nextX].tileType === type) {
                return 1 //Is a match
            }
        case "coin": 
            if (grid[nextY][nextX].tileType === type) {
                return 1 //Is a match
            }
        case "health-potion": 
            if (grid[nextY][nextX].tileType === type) {
                return 1 //Is a match
            }
    }
    
    return 0; //No match
}

export default CheckNextTile;