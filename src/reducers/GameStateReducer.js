export const GameStateReducer = (state, action) => {
    switch(action.type) {
        case "SET_START_TILE": 
            let newGridWithStart = state.GameGrid;
            newGridWithStart[action.payload.y][action.payload.x] = {
                ...newGridWithStart[action.payload.y][action.payload.x],
                props: {
                    ...newGridWithStart[action.payload.y][action.payload.x].props,
                    isActive: true,
                    joiningStyle: "dot"
                }
            }
        return { ...state,
            GameGrid: newGridWithStart,
            StartTile: action.payload,
            CurrentTile: action.payload
        }

        case "ADD_JOINING_TILE": {
            let newGrid = state.GameGrid;
            newGrid[action.payload.y][action.payload.x] = {
                ...newGrid[action.payload.y][action.payload.x],
                props: {
                    ...newGrid[action.payload.y][action.payload.x].props,
                    isActive: true,
                    joiningStyle: action.payload.joiningStyle
                }
            }

            return { ...state,
                CurrentTile: action.payload,
                GameGrid: newGrid
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
            StartTileType: "none"
        }

        default: throw new Error("INVALID action.type GIVEN IN GameStateReducer - RECEIVED: " + action.type);
    }
}

export default GameStateReducer;