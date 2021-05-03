import TileGenerator from "./TileGenerator";

export const TileReplacer = (grid, selectedTiles) => {
    return grid.map(inner => {
        return inner.map(tile => {
            if (!selectedTiles.some(x => x === tile)) 
                return tile;
            return TileGenerator(tile.width, tile.height, tile.selfX, tile.selfY);
        });
    });
}

export default TileReplacer;