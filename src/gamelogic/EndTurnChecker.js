import TileDeactivator from "../gamelogic/TileDeactivator";
import TileGenerator from "./TileGenerator";

export const EndTurnChecker = (state, dispatch, tileRefs) => {
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
                                return TileGenerator(tile.sideLength, tile.selfX, tile.selfY, 0, tile.id);
                            else {
                                return {
                                    ...tile,
                                    enemyHealth: newHp
                                }
                            }
                        } else
                            return TileGenerator(tile.sideLength, tile.selfX, tile.selfY, 0, tile.id);
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

    //Create empty tiles
    newGrid = newGrid.map((inner, y) => {
        return inner.map((tile, x) => {
            if (!state.SelectedTiles.some(x => x === tile)) 
                return tile; //Do nothing since this tile isnt part of the active set
            return TileGenerator(tile.sideLength, tile.selfX, tile.selfY, 0, tile.id);
        })
    });

    // cascade after removal with animation
    // newGrid.forEach((inner, y) => {
    //    inner.forEach((tile, x) => {
    //        if (y > 0 && tile.tileType === "blank") {
    //            console.log("blank at " + x + ", " + (y + 1));
    //            tileRefs.current[newGrid[y - 1][x].id].to({
    //                y: (tile.selfY) * tile.sideLength,
    //                duration: 0.2,
    //                onFinish: () => {
    //                 newGrid[y][x] = { ...newGrid[y - 1][x], selfY: newGrid[y - 1][x].selfY + 1 };
    //                 newGrid[y - 1][x] = { ...tile };
    //                    dispatch({ type: "UPDATE_GRID", payload: newGrid })
    //                }
    //            });
    //        }
    //    });
    // });

    // cascade after removal with animation, hides removed tiles
    //newGrid.forEach((inner, y) => {
    //    inner.forEach((tile, x) => {
    //        if (y < 5 && newGrid[y + 1][x].tileType === "blank" && newGrid[y][x].tileType !== "blank") {
    //            console.log("blank at " + x + ", " + (y + 1));
    //            tileRefs.current[newGrid[y][x].id].to({
    //                y: (tile.selfY + 1) * tile.sideLength,
    //                duration: 0.2,
    //                onFinish: () => {
    //                    tileRefs.current[newGrid[y + 1][x].id].show();
    //                    tileRefs.current[newGrid[y][x].id].show();
    //                    dispatch({ type: "UPDATE_GRID", payload: newGrid }); //commit the final new grid to the state/ui
    //                }
    //            });
    //            tileRefs.current[newGrid[y + 1][x].id].hide();
    //            let t = { ...newGrid[y + 1][x] };
    //            newGrid[y + 1][x] = { ...tile, selfY: tile.selfY + 1 };
    //            newGrid[y][x] = t;
    //        }
    //    });
    //});

    // cascade after removal with animation, hides removed tiles - split function
    // const shift = (x, y, tile) => {
    //     tileRefs.current[newGrid[y][x].id].to({
    //         y: (tile.selfY + 1) * tile.sideLength,
    //         duration: 0.2,
    //         onFinish: () => {
    //             //tileRefs.current[newGrid[y + 1][x].id].show();
    //             //tileRefs.current[newGrid[y][x].id].show();
    //             dispatch({ type: "UPDATE_GRID", payload: newGrid }); //commit the final new grid to the state/ui
    //         }
    //     });
    //     //tileRefs.current[newGrid[y + 1][x].id].hide();
    //     let currentTile = { ...newGrid[y][x], selfY: newGrid[y + 1][x].selfY, id: newGrid[y + 1][x].id }
    //     let belowTile = { ...newGrid[y + 1][x],selfY: newGrid[y][x].selfY, id: newGrid[y][x].id }
    //     newGrid[y + 1][x] = currentTile
    //     newGrid[y][x] = belowTile
    // }
        
    // newGrid.forEach((inner, y) => {
    //     inner.forEach((tile, x) => {
    //         if (y < 5 && newGrid[y + 1][x].tileType === "blank") {
    //             console.log("blank at " + x + ", " + (y + 1));
    //             shift(x, y, tile);
    //         }
    //     });
    // });

    let filteredEmpties = newGrid.flat().filter(tile => state.SelectedTiles.map(selected => selected.id).includes(tile.id));
    for (let filtered of filteredEmpties) {
        if (filtered.tileType === "blank") {
            tileRefs.current[filtered.id].hide();
        }
    }

    for (let pass = 0; pass < 5; pass++) {
        for (let y = 5; y > 0; y--) {
            for (let x = 0; x < 6; x++) {
                if (y > 0 && newGrid[y][x].tileType === "blank") {
                    console.log("blank at " + x + ", " + (y) + ", above a " + newGrid[y - 1][x].tileType);
                    for (let shiftOffset = y; shiftOffset > 0; shiftOffset--) {
                        let tileAbove = { ...newGrid[shiftOffset - 1][x], selfY: shiftOffset, id: newGrid[shiftOffset][x].id };
                        let tileCurrent = { ...newGrid[shiftOffset][x], selfY: shiftOffset - 1, id: newGrid[shiftOffset - 1][x].id };
                        tileRefs.current[newGrid[shiftOffset - 1][x].id].to({
                            y: (newGrid[shiftOffset - 1][x].selfY + 1) * newGrid[shiftOffset][x].sideLength,
                            duration: 0.1,
                            onFinish: () => {
                                tileRefs.current[newGrid[shiftOffset - 1][x].id].y((newGrid[shiftOffset - 1][x].selfY) * newGrid[shiftOffset][x].sideLength);
                                for (let filtered of filteredEmpties) {
                                    if (filtered.tileType === "blank") {
                                        tileRefs.current[filtered.id].show();
                                    }
                                }
                                dispatch({ type: "UPDATE_GRID", payload: newGrid }); 
                            }
                        });
                        newGrid[shiftOffset - 1][x] = tileCurrent
                        newGrid[shiftOffset][x] = tileAbove
                    }
                }
            }
        }
    }

    

    console.table(newGrid.map(outer => outer.map(tile => `${tile.tileType} @ (${tile.selfX}, ${tile.selfY}), id: ${tile.id} - ${tile.isActive}`)))

    //replace the tiles that were used in SelectedTiles
    //newGrid = newGrid.map(inner => {
    //   return inner.map(tile => {
    //       if (tile.tileType === "blank") 
    //           return TileGenerator(tile.sideLength, tile.selfX, tile.selfY, -1, tile.id); //Replace blank tiles with new ones
    //       return tile; //Do nothing since this tile isnt part of the active set
    //   })
    //})

    dispatch({ type: "DRAG_END" });  //Reset tiles to inactive state and restore any that need restoring
}

export default EndTurnChecker;