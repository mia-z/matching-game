export const GameStateReducer = (state, action) => {
    switch(action.type) {
        case "SET_START_TILE": return { ...state,
            StartTile: action.payload
        }

        case "SET_CURRENT_TILE": return { ...state,
            CurrentTile: action.payload
        }

        case "UNSET_START_TILE": return { ...state,
            StartTile: { x: -1, y: -1 }
        }

        case "UNSET_CURRENT_TILE": return { ...state,
            CurrentTile: { x: -1, y: -1 }
        }    

        case "ADD_SELECTED_TILE": return { ...state,
            SelectedTiles: [ ...state.SelectedTiles, action.payload ]
        }

        case "REMOVE_SELECTED_TILE": return { ...state,
            SelectedTiles: state.SelectedTiles.filter((tile, index, array) => {
                return tile.selfX !== action.payload.x && tile.selfY !== action.payload.y
            })
        }

        default: throw new Error("INVALID action.type GIVEN IN GameStateReducer - RECEIVED: " + action.type);
    }
}

export default GameStateReducer;