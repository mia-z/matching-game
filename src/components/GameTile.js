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
            
        }
    }, [isDragging, state, dispatch]);

    const mouseLeaveHandler = useCallback(({ offsetX, offsetY, target: { clientWidth, clientHeight } }) => {
        let exit = getExitDirection(offsetX, offsetY, clientHeight, clientWidth);
        console.log(exit);
    }, [tile, state]);

    const getExitDirection = (x, y, width = 75, height = 60) => {
        if (y < -0.5) return "top";
        if (y > 59.5) return "bottom";
        if (x < -0.5) return "left";
        if (x > 74) return "right";
    };

    useEffect(() => {
        if (overTile && !isDragging) {
            setOverTile(false);
            setJoiningStyle("dot");
        }
    }, [isDragging, joiningStyle]);

    useEffect(() => {
        tile.current.addEventListener("pointerleave", mouseLeaveHandler);

        return () => {
            tile.current.removeEventListener("pointerleave", mouseLeaveHandler);
        }
    }, [tile, mouseLeaveHandler]);

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