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
                isActive: true,
                joiningStyle: action.payload.joiningStyle
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
                isActive: false,
                joiningStyle: "dot"
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
            GameGrid: makeTilesInactive(state.GameGrid)
        }

        default: throw new Error("INVALID action.type GIVEN IN GameStateReducer - RECEIVED: " + action.type);
    }
}

const makeTilesInactive = (grid) => 
    grid.map(outer => 
        outer.map(inner => {
            return {
                ...inner,
                isActive: false,
                joiningStyle: "dot"
            }
        })
    );

const checkTiles = (tiles) => {
    
}

export default GameStateReducer;