import React, { useCallback, useState, useEffect, useRef } from "react";
import "./../styles/gametile.scss";

export const GameTile = ({ width, height, selfX, selfY, isDragging, value, state, dispatch }) => {
    const [overTile, setOverTile] = useState(false);
    const [nextTile, setNextTile] = useState(null);
    const [joiningStyle, setJoiningStyle] = useState("dot");
    const tile = useRef(null);

    const style = {
        width: width,
        height: height
    };

    const mouseMoveHandler = useCallback((e) => {
        if (isDragging) {
            if (state.StartTile.x < 0 && state.StartTile.y < 0) {
                dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY } });
                dispatch({ type: "SET_CURRENT_TILE", payload: { x: selfX, y: selfY } });
            } else {
                if (state.CurrentTile.x > selfX) {
                    setJoiningStyle("horizontal-left");
                } 
                else if (state.CurrentTile.x < selfX) {
                    setJoiningStyle("horizontal-right");
                } 
                else if(state.CurrentTile.y > selfY) {
                    setJoiningStyle("vertical-up");
                }
                else if(state.CurrentTile.y < selfY) {
                    setJoiningStyle("vertical-down");
                }
                dispatch({ type: "SET_CURRENT_TILE", payload: { x: selfX, y: selfY } });
            }
            setOverTile(true);
        }
    }, [isDragging, state, dispatch]);

    useEffect(() => {
        if (overTile && !isDragging) {
            setOverTile(false);
            setJoiningStyle("dot");
        }
    }, [isDragging, joiningStyle]);

    useEffect(() => {
        tile.current.addEventListener("mousemove", mouseMoveHandler);
        tile.current.addEventListener("mousedown", mouseMoveHandler);

        return () =>{
            tile.current.removeEventListener("mousemove", mouseMoveHandler);
            tile.current.removeEventListener("mousedown", mouseMoveHandler);
        }
    }, [tile, mouseMoveHandler]);

    return (
        <div ref={tile} style={style} className={`game-tile bg-green-400`}>
            <span className={"text-xs"}>{value},&nbsp;{joiningStyle}</span>
            { isDragging && overTile &&
                <div className={`tile-selected ${joiningStyle}`} />
            }
        </div>
    );
}

export default GameTile;