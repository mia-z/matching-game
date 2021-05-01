import React, { useCallback, useState, useEffect, useRef } from "react";
import "./../styles/gametile.scss";

export const GameTile = ({ 
        width, 
        height, 
        selfX, 
        selfY, 
        isActive, 
        value, 
        state, 
        dispatch, 
        joiningStyle 
    }) => {

    const [overTile, setOverTile] = useState(false);
    const [nextTile, setNextTile] = useState(null);

    const tile = useRef(null);

    const style = {
        width: width,
        height: height
    };

    const mouseLeaveHandler = useCallback(({ offsetX, offsetY, target: { clientWidth, clientHeight } }) => {
        let exit = getExitDirection(offsetX, offsetY, clientHeight, clientWidth);
        console.log(exit);
        switch(exit) {
            case "up": 
                dispatch({ type: "ADD_JOINING_TILE", payload: { x: selfX, y: selfY - 1, joiningStyle: "vertical-up" } }); 
                break;
            case "right": 
                dispatch({ type: "ADD_JOINING_TILE", payload: { x: selfX + 1, y: selfY, joiningStyle: "horizontal-right" } }); 
                break;
            case "down": 
                dispatch({ type: "ADD_JOINING_TILE", payload: { x: selfX, y: selfY + 1, joiningStyle: "vertical-down" } }); 
                break;
            case "left": 
                dispatch({ type: "ADD_JOINING_TILE", payload: { x: selfX - 1, y: selfY, joiningStyle: "horizontal-left" } }); 
                break;
            default: 
                throw Error("INVALID DIRECTION RECEIVED WHEN LEAVING TILE");
        }
        
    }, [tile, state, dispatch]);

    const mouseEnterHandler = useCallback((e) => {

    }, [])

    const mouseClickHandler = useCallback((e) => {
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY } });
    }, [dispatch]);

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
        <div ref={tile} style={style} className={`game-tile bg-green-400`}>
            <div className={"text-xs"}>{value},&nbsp;{joiningStyle}</div>
            <div className={"text-xs"}>{selfX},&nbsp;{selfY}</div>
            { state.IsDragging && isActive &&
                <div className={`tile-selected ${joiningStyle}`} />
            }
        </div>
    );
}

export default GameTile;