import TileGenerator from "./TileGenerator";

export const ReplaceNullTiles = (grid,) => {
    return grid.map(inner => {
        return inner.map(tile => {
            if (tile) 
                return tile; //Do nothing since this tile isnt part of the active set
            return TileGenerator(tile.width, tile.height, tile.selfX, tile.selfY);
        });
    });
}

export default ReplaceNullTiles;