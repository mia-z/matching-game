export const GameStateReducer = (state, action) => {
    switch(action.type) {
        case "SET_START_TILE": 
            let newGridWithStart = state.GameGrid;
            newGridWithStart[action.payload.y][action.payload.x] = {
                ...newGridWithStart[action.payload.y][action.payload.x],
                isActive: true,
            }
        return { ...state,
            GameGrid: newGridWithStart,
            StartTile: action.payload,
            CurrentTile: action.payload,
            LastSelectedTile: action.payload,
            StartTileType: action.payload.tileType,
            LinePoints: [ action.payload.x * 120, action.payload.y * 120 ],
            SelectedTiles: [ ...state.SelectedTiles, newGridWithStart[action.payload.y][action.payload.x] ]
        }

        case "SET_CURRENT_TILE": return {
            ...state,
            CurrentTile: action.payload
        }

        case "ADD_JOINING_TILE": 
            let gridWithNewTile = state.GameGrid;
            gridWithNewTile[action.payload.y][action.payload.x] = {
                ...gridWithNewTile[action.payload.y][action.payload.x],
                isActive: true
            }
            return { ...state,
                CurrentTile: action.payload,
                LastSelectedTile: action.payload,
                GameGrid: gridWithNewTile,
                SelectedTiles: [ ...state.SelectedTiles, gridWithNewTile[action.payload.y][action.payload.x] ],
                LinePoints: [ ...state.LinePoints, action.payload.x * 120, action.payload.y * 120 ],
            }
        
        case "REMOVE_JOINING_TILE": 
            let gridWithRemovedTile = state.GameGrid;
            gridWithRemovedTile[action.payload.y][action.payload.x] = {
                ...gridWithRemovedTile[action.payload.y][action.payload.x],
                isActive: false
            }

            let newSelectedTiles = state.SelectedTiles.slice(0, -1);
            let newCurrentTile = newSelectedTiles[newSelectedTiles.length - 1];
            let newLinePoints = state.LinePoints.slice(0, -2);

            return { ...state,
                CurrentTile: { x: newCurrentTile.selfX, y: newCurrentTile.selfY },
                LastSelectedTile: { x: newCurrentTile.selfX, y: newCurrentTile.selfY },
                GameGrid: gridWithRemovedTile,
                SelectedTiles: newSelectedTiles,
                LinePoints: newLinePoints
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
            LinePoints: []
        }

        case "UPDATE_GRID": return {
            ...state,
            GameGrid: action.payload
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