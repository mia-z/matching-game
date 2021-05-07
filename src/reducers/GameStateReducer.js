import TileReplacer from "../gamelogic/TileReplacer";
import TileDeactivator from "../gamelogic/TileDeactivator";

export const GameStateReducer = (state, action) => {
    switch(action.type) {
        case "SET_START_TILE": 
            let newGridWithStart = state.GameGrid;
            newGridWithStart[action.payload.y][action.payload.x] = {
                ...newGridWithStart[action.payload.y][action.payload.x],
                isActive: true,
                joiningStyle: "dot"
            }
        return { ...state,
            GameGrid: newGridWithStart,
            StartTile: action.payload,
            CurrentTile: action.payload,
            SelectedTiles: [ ...state.SelectedTiles, newGridWithStart[action.payload.y][action.payload.x] ]
        }

        case "ADD_JOINING_TILE": {
            let newGrid = state.GameGrid;
            newGrid[action.payload.y][action.payload.x] = {
                ...newGrid[action.payload.y][action.payload.x],
                isActive: true
            }
            return { ...state,
                CurrentTile: action.payload,
                GameGrid: newGrid,
                SelectedTiles: [ ...state.SelectedTiles, newGrid[action.payload.y][action.payload.x] ]
            }
        }

        case "REMOVE_JOINING_TILE": {
            let newGrid = state.GameGrid;
            newGrid[action.payload.y][action.payload.x] = {
                ...newGrid[action.payload.y][action.payload.x],
                isActive: false
            }

            let tileToRemove = state.SelectedTiles.find(tile => {
                if (tile.selfX === action.payload.x && tile.selfY === action.payload.y) {
                    return true;
                }
            });

            let newSelectedTiles = state.SelectedTiles.filter(x => x !== tileToRemove);
            let newCurrentTile = newSelectedTiles[newSelectedTiles.length - 1];

            return { ...state,
                CurrentTile: { x: newCurrentTile.selfX, y: newCurrentTile.selfY },
                GameGrid: newGrid,
                SelectedTiles: newSelectedTiles
            }
        }

        case "DRAG_START": return {
            ...state,
            IsDragging: true
        }

        case "DRAG_END": return {
            ...state,
            IsDragging: false,
            StartTile: { x: -1, y: -1 },
            CurrentTile: { x: -1, y: -1 },
            StartTileType: "none",
            SelectedTiles: [],
            GameGrid: state.SelectedTiles.length > 2 ? TileReplacer(state.GameGrid, state.SelectedTiles, state.Score.BaseDamage) : TileDeactivator(state.GameGrid)
        }

        case "UPDATE_STAT": {
            return {
                ...state,
                Score: {
                    ...state.Score,
                    [action.payload.key]: action.payload.value 
                }
            }
        }

        default: throw new Error("INVALID action.type GIVEN IN GameStateReducer - RECEIVED: " + action.type);
    }
}

export default GameStateReducer;