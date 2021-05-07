export const EndTurnChecker = (state, dispatch) => {
    console.log(state);

    let turnType = state.SelectedTiles[0].tileType; //Gets the first tile used (in the current case this determines what kind of action/turn is performed)
    
    console.log(turnType);

    switch(turnType) {
        case "sword":
        case "enemy": 
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

}

export default EndTurnChecker;