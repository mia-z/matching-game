import React, { useCallback, useState, useEffect, useRef, useContext } from "react";
import CheckNextTile from "./../gamelogic/CheckNextTile";
import "./../styles/gametile.scss";
import { NextCoordinatesFromDirection, GetExitDirection } from "./../gamelogic/Utils";
import { DrawStart, DrawJoiningLine, RemoveJoiningLine } from "./../gamelogic/OverlayControls";
import KonvaStore from "./../KonvaStore";

export const GameTile = ({ 
        sideLength,
        selfX, 
        selfY, 
        isActive, 
        tileType, 
        state, 
        dispatch, 
        iconPath,
        debugColor,
        isEnemy,
        enemyHealth,
        enemyDamage,
    }) => {

    const { konva } = useContext(KonvaStore);

    const [overTile, setOverTile] = useState(false);

    const tile = useRef(null);

    const style = {
        width: sideLength,
        height: sideLength
    };

    const mouseLeaveHandler = useCallback(({ offsetX, offsetY, target: { clientWidth, clientHeight } }) => {
        let direction = GetExitDirection(offsetX, offsetY, sideLength);

        let nextCoords = NextCoordinatesFromDirection(selfX, selfY, direction);

        let nextTileReturnCode = CheckNextTile(selfX, selfY, nextCoords.x, nextCoords.y, tileType, state.GameGrid, state.SelectedTiles);

        if (nextTileReturnCode === 2) {
            RemoveJoiningLine(konva);
            return dispatch({ type: "REMOVE_JOINING_TILE", payload: { x: selfX, y: selfY } }); 
        }

        if (nextTileReturnCode === 1) {
            DrawJoiningLine(konva, nextCoords.x, nextCoords.y, sideLength);
            return dispatch({ type: "ADD_JOINING_TILE", payload: { x: nextCoords.x, y: nextCoords.y } }); 
        }

    }, [tile, state, dispatch, selfX, selfY, tileType, konva]);

    const mouseEnterHandler = useCallback((e) => {

    }, [])

    const mouseClickHandler = useCallback((e) => {
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY } });
        DrawStart(konva, selfX, selfY, sideLength);
    }, [dispatch, konva]);

    useEffect(() => {
        if (overTile && !state.IsDragging) {
            setOverTile(false);
        }
    }, [state.IsDragging]);

    useEffect(() => {
        if (!state.IsDragging) {
            //tile.current.addEventListener("pointerdown", mouseClickHandler);
        } 

        return () => {
            if (!state.IsDragging) {
                //tile.current.removeEventListener("pointerdown", mouseClickHandler);
            } 
        }
    }, [state.IsDragging, tile, mouseClickHandler]);

    useEffect(() => {
        if (state.CurrentTile.x === selfX && state.CurrentTile.y === selfY) {
            //tile.current.addEventListener("pointerleave", mouseLeaveHandler);
        }

        return () => {
            if (state.CurrentTile.x === selfX && state.CurrentTile.y === selfY) {
                //tile.current.removeEventListener("pointerleave", mouseLeaveHandler);
            }
        }
    }, [state, selfX, selfY, mouseLeaveHandler]);

    return (
        <div ref={tile} style={style} className={`game-tile`}>
            <div className={`game-tile-wrapper ${tileType}`}>
                { state.IsDragging && isActive &&
                    <div className={`tile-selected`} />
                }
                {
                    isEnemy &&
                    <>
                        <div className={"enemy-health"}>
                            <div>{enemyHealth}</div>
                        </div>
                        <div className={"enemy-damage"}>
                            <div>{enemyDamage}</div>
                        </div>
                    </> 
                    
                }
                <img className={""} src={iconPath} />
            </div>
        </div>
    );
}

export default GameTile;