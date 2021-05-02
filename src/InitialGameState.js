import GridGenerator from "./gamelogic/GridGenerator";

export const InitialGameState = {
    GameGrid: GridGenerator(),
    StartTile: { x: -1, y: -1 },
    CurrentTile: { x: -1, y: -1 },
    StartTileType: "none",
    IsDragging: false,
    SelectedTiles: []
}

export default InitialGameState;