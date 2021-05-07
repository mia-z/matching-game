export const CheckNextTile = (selfX, selfY, nextX, nextY, type, grid, existingTiles) => {
    if (existingTiles.some(x => x.selfX === nextX && x.selfY === nextY)) {
        let previousTileIndex = existingTiles.length - 1;

        if (existingTiles[previousTileIndex].selfX === selfX && existingTiles[previousTileIndex].selfY === selfY) {
            return 2; //Is the previous tile
        }
    }

    if (grid[nextY][nextX].tileType === type) {
        console.log("match");
        return 1 //Is a match
    }

    console.log("no match");
    return 0; //No match
}

export default CheckNextTile;