import TileDeactivator from "../gamelogic/TileDeactivator";
import TileGenerator from "./TileGenerator";

export const EndTurnChecker = (state, dispatch) => {
    let newGrid = state.GameGrid;

    if (state.SelectedTiles.length < 3) {
        dispatch({ type: "UPDATE_GRID", payload: TileDeactivator(state.GameGrid) });
        return dispatch({ type: "DRAG_END" });
    }

    let turnType = state.SelectedTiles[0].tileType; //Gets the first tile used (in the current case this determines what kind of action/turn is performed)
    
    switch(turnType) {
        case "sword":
        case "enemy":
            let updatedGrid = state.GameGrid.map(inner => {
                return inner.map(tile => {
                    if (!state.SelectedTiles.some(x => x === tile)) {
                        return tile
                    } else {
                        if (tile.isEnemy) {
                            let swords = state.SelectedTiles.filter(x => x.tileType === "sword").length;
                            let totalDamage =  state.Score.BaseDamage + swords; 
                            let newHp = tile.enemyHealth - totalDamage;
                            if (newHp <= 0)
                                return TileGenerator(tile.sideLength, tile.selfX, tile.selfY);
                            else {
                                return {
                                    ...tile,
                                    enemyHealth: newHp
                                }
                            }
                        } else
                            return TileGenerator(tile.sideLength, tile.selfX, tile.selfY);
                    }
                })
            });
            
            newGrid = updatedGrid;

            break;

        case "shield": 
            let newArmour = state.Score.Armour + state.SelectedTiles.length;
            if (newArmour > state.Score.MaxArmour) 
                newArmour = state.Score.MaxArmour;
            dispatch({
                type: "UPDATE_STAT",
                payload: { key: "Armour", value: newArmour }
            });
            break;

        case "coin": 
            let newCoin = state.Score.Gold + state.SelectedTiles.length;
            dispatch({
                type: "UPDATE_STAT",
                payload: { key: "Gold", value: newCoin }
            });
            break;

        case "health-potion": 
            let newHealth = state.Score.Health + state.SelectedTiles.length;
            if (newHealth > state.Score.MaxHealth) 
                newHealth = state.Score.MaxHealth;
            dispatch({
                type: "UPDATE_STAT",
                payload: { key: "Health", value: newHealth }
            });
            break;
        }

    //do enemy damage


    //replace the tiles that were used in SelectedTiles
    newGrid = newGrid.map(inner => {
        return inner.map(tile => {
            if (!state.SelectedTiles.some(x => x === tile)) 
                return tile; //Do nothing since this tile isnt part of the active set
            return TileGenerator(tile.sideLength, tile.selfX, tile.selfY);
            })
        })

    dispatch({ type: "UPDATE_GRID", payload: newGrid }); //commit the final new grid to the state/ui

    dispatch({ type: "DRAG_END" });  //Reset tiles to inactive state and restore any that need restoring
}

export default EndTurnChecker;