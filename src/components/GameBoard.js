import React, { useRef, useEffect, useState, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTile from "./GameTile";

export const GameBoard = ({state, dispatch, grid}) => {
    const board = useRef(null);

    const startDragging = useCallback((e) => {
        dispatch({ type: "DRAG_START" });
    }, [dispatch]);

    const stopDragging = useCallback((e) => {
        dispatch({ type: "DRAG_END" });

        //dispatch({ type: "UNSET_START_TILE" });
        //dispatch({ type: "UNSET_CURRENT_TILE" });
    }, [dispatch]);

    useEffect(() => {
        board.current.addEventListener("mousedown", startDragging);
        board.current.addEventListener("mouseup", stopDragging);

        return () => {
            board.current.removeEventListener("mousedown", startDragging);
            board.current.removeEventListener("mouseup", stopDragging);
        }
    }, [startDragging, stopDragging]);
console.log(state.GameGrid);
    return (
        <div id={"game-board-root"} className={"bg-red-400"}>
            {state.IsDragging ? "down" : "up"}
            <div>StartTile:&nbsp;({state.StartTile.x}, {state.StartTile.y}), CurrentTile:&nbsp;({state.CurrentTile.x}, {state.CurrentTile.y})</div>
            <div ref={board} className={"game-board"}>
            {
                grid.map((outer, outerIndex, outerArray) => (
                    <React.Fragment key={`y-${outerIndex}`}>
                    {
                        outer.map((inner, innerIndex, innerArray) => (
                            <React.Fragment key={`x-${innerIndex}`}>
                                <GameTile {...inner.props} state={state} dispatch={dispatch}/>
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