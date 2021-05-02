export const CheckNextTile = (nextX, nextY, type, grid, existingTiles) => {
    if (existingTiles.some(x => x.selfX === nextX && x.selfY === nextY)) {
        return 2;
    }

    if (grid[nextY][nextX].tileType === type) {
        console.log("match");
        return 1
    }

    console.log("no match");
    return 0;
}

export default CheckNextTile;