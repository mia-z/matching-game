import React, { useRef, useEffect, useState, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTile from "./GameTile";

export const GameBoard = ({state, dispatch, grid}) => {
    const [isDragging, setIsDragging] = useState(false);

    const board = useRef(null);

    const startDragging = useCallback((e) => {
        setIsDragging(true);
    }, [setIsDragging]);

    const stopDragging = useCallback((e) => {
        setIsDragging(false);
        dispatch({ type: "UNSET_START_TILE" });
        dispatch({ type: "UNSET_CURRENT_TILE" });
    }, [setIsDragging]);

    useEffect(() => {
        board.current.addEventListener("mousedown", startDragging);
        board.current.addEventListener("mouseup", stopDragging);

        return () => {
            board.current.removeEventListener("mousedown", startDragging);
            board.current.removeEventListener("mouseup", stopDragging);
        }
    }, [startDragging, stopDragging]);

    return (
        <div id={"game-board-root"} className={"bg-red-400"}>
            {isDragging ? "down" : "up"}
            <div>StartTile:&nbsp;({state.StartTile.x}, {state.StartTile.y}), CurrentTile:&nbsp;({state.CurrentTile.x}, {state.CurrentTile.y})</div>
            <div ref={board} className={"game-board"}>
            {
                grid.map((outer, outerIndex, outerArray) => (
                    <React.Fragment key={`y-${outerIndex}`}>
                    {
                        outer.map((inner, innerIndex, innerArray) => (
                            <React.Fragment key={`x-${innerIndex}`}>
                                <GameTile {...inner.props} isDragging={isDragging} state={state} dispatch={dispatch}/>
                            </React.Fragment>
                        ))
                    }
                    </React.Fragment>
                ))
            }
            </div>
        </div>
    );
}

export default GameBoard;