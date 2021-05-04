import React, { useCallback, useState, useEffect, useRef } from "react";
import CheckNextTile from "./../gamelogic/CheckNextTile";
import "./../styles/gametile.scss";
import { NextCoordinatesFromDirection } from "./../gamelogic/Utils";

export const GameTile = ({ 
        width, 
        height, 
        selfX, 
        selfY, 
        isActive, 
        tileType, 
        state, 
        dispatch, 
        joiningStyle 
    }) => {

    const [overTile, setOverTile] = useState(false);

    const tile = useRef(null);

    const style = {
        width: width,
        height: height
    };

    const mouseLeaveHandler = useCallback(({ offsetX, offsetY, target: { clientWidth, clientHeight } }) => {
        let exit = getExitDirection(offsetX, offsetY, clientHeight, clientWidth);

        let nextCoords = NextCoordinatesFromDirection(selfX, selfY, exit);

        let nextTileReturnCode = CheckNextTile(nextCoords.x, nextCoords.y, tileType, state.GameGrid, state.SelectedTiles);

        if (nextTileReturnCode === 2) {
            console.log("meme");
            return dispatch({ type: "REMOVE_JOINING_TILE", payload: { x: selfX, y: selfY } }); 
        }

        if (nextTileReturnCode === 1) {
            return dispatch({ type: "ADD_JOINING_TILE", payload: { x: nextCoords.x, y: nextCoords.y, joiningStyle: getJoiningDirection(exit) } }); 
        }

    }, [tile, state, dispatch, selfX, selfY, tileType]);

    const mouseEnterHandler = useCallback((e) => {

    }, [])

    const mouseClickHandler = useCallback((e) => {
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY } });
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
            setJoiningStyle("dot");
        }
    }, [state.IsDragging, joiningStyle]);

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
            <div className={`wrapper ${tileType}`}>
                <div className={"text-xs"}>{selfX},&nbsp;{selfY}</div>
                { state.IsDragging && isActive &&
                    <div className={`tile-selected ${joiningStyle}`} />
                }
            </div>
        </div>
    );
}

export default GameTile;