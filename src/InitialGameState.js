import GridGenerator from "./gamelogic/GridGenerator";

export const InitialGameState = {
    GameGrid: GridGenerator(),
    StartTile: { x: -1, y: -1 },
    CurrentTile: { x: -1, y: -1 },
    LastSelectedTile: { x: -1, y: -1 },
    StartTileType: "none",
    IsDragging: false,
    SelectedTiles: [],
    LinePoints: [],
    Score: {
        Gold: 0,
        Experience: 0,
        BaseDamage: 1,
        MaxHealth: 20,
        Health: 10,
        MaxArmour: 5,
        Armour: 0,

    }
}

export default InitialGameState;