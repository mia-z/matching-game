import React, { useCallback, useState, useEffect, useRef } from "react";
import CheckNextTile from "./../gamelogic/CheckNextTile";
import "./../styles/gametile.scss";
import { NextCoordinatesFromDirection } from "./../gamelogic/Utils";
import { DrawStart, DrawJoiningLine, RemoveJoiningLine } from "./../gamelogic/OverlayControls";

export const GameTile = ({ 
        width, 
        height, 
        selfX, 
        selfY, 
        isActive, 
        tileType, 
        state, 
        dispatch, 
        canvas,
        iconPath
    }) => {

    const [overTile, setOverTile] = useState(false);

    const tile = useRef(null);

    const style = {
        width: width,
        height: height
    };

    const mouseLeaveHandler = useCallback(({ offsetX, offsetY, target: { clientWidth, clientHeight } }) => {
        let direction = getExitDirection(offsetX, offsetY, clientHeight, clientWidth);

        let nextCoords = NextCoordinatesFromDirection(selfX, selfY, direction);

        let nextTileReturnCode = CheckNextTile(nextCoords.x, nextCoords.y, tileType, state.GameGrid, state.SelectedTiles);

        if (nextTileReturnCode === 2) {
            console.log("meme");
            RemoveJoiningLine(canvas.current, selfX, selfY, nextCoords.x, nextCoords.y, direction);
            return dispatch({ type: "REMOVE_JOINING_TILE", payload: { x: selfX, y: selfY } }); 
        }

        if (nextTileReturnCode === 1) {
            DrawJoiningLine(canvas.current, selfX, selfY, nextCoords.x, nextCoords.y);
            return dispatch({ type: "ADD_JOINING_TILE", payload: { x: nextCoords.x, y: nextCoords.y, joiningStyle: getJoiningDirection(direction) } }); 
        }

    }, [tile, state, dispatch, selfX, selfY, tileType]);

    const mouseEnterHandler = useCallback((e) => {

    }, [])

    const mouseClickHandler = useCallback((e) => {
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY } });
        DrawStart(canvas.current, selfX, selfY);
    }, [dispatch]);

    const getJoiningDirection = (dir) => {
        switch(dir) {
            case "up": return "vertical-up";
            case "right": return "horizontal-right";
            case "down": return "vertical-down";
            case "left": return "horizontal-left";
            default: throw new Error("INVALID JOINING DIRECTION GIVEN @ getJoiningDirection IN GameTile.js");
        }
    }

    const getExitDirection = (x, y, width = 75, height = 60) => {
        if (y < -0.5) return "up";
        if (y > 59.5) return "down";
        if (x < -0.5) return "left";
        if (x > 74) return "right";
    };

    useEffect(() => {
        if (overTile && !state.IsDragging) {
            setOverTile(false);
        }
    }, [state.IsDragging]);

    useEffect(() => {
        if (!state.IsDragging) {
            tile.current.addEventListener("pointerdown", mouseClickHandler);
        } 

        return () => {
            if (!state.IsDragging) {
                tile.current.removeEventListener("pointerdown", mouseClickHandler);
            } 
        }
    }, [state.IsDragging, tile, mouseClickHandler]);

    useEffect(() => {
        if (state.CurrentTile.x === selfX && state.CurrentTile.y === selfY) {
            tile.current.addEventListener("pointerleave", mouseLeaveHandler);
        }

        return () => {
            if (state.CurrentTile.x === selfX && state.CurrentTile.y === selfY) {
                tile.current.removeEventListener("pointerleave", mouseLeaveHandler);
            }
        }
    }, [state, selfX, selfY, mouseLeaveHandler]);

    return (
        <div ref={tile} style={style} className={`game-tile`}>
            <div className={`game-tile-wrapper ${tileType}`}>
                { state.IsDragging && isActive &&
                    <div className={`tile-selected`} />
                }
                <img className={""} src={iconPath} />
            </div>
        </div>
    );
}

export default GameTile;