import React, { useRef, useEffect, useState, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTile from "./GameTile";

export const GameBoard = ({state, dispatch, grid}) => {
    const board = useRef(null);
    const canvas = useRef(null);
    
    const startDragging = useCallback((e) => {
        dispatch({ type: "DRAG_START" });
    }, [dispatch]);

    const stopDragging = useCallback((e) => {
        dispatch({ type: "DRAG_END" });
    }, [dispatch]);

    useEffect(() => {
        board.current.addEventListener("mousedown", startDragging);
        board.current.addEventListener("mouseup", stopDragging);

        return () => {
            board.current.removeEventListener("mousedown", startDragging);
            board.current.removeEventListener("mouseup", stopDragging);
        }
    }, [startDragging, stopDragging]);

    return (
        <div>
            <div id={"game-board-root"} className={""}>
                <canvas ref={canvas} id={"overlay"} className={"overlay-canvas"} />
                <div ref={board} className={"game-board"}>
                {
                    grid.map((outer, outerIndex, outerArray) => (
                        <React.Fragment key={`y-${outerIndex}`}>
                        {
                            outer.map((inner, innerIndex, innerArray) => (
                                <React.Fragment key={`x-${innerIndex}`}>
                                    <GameTile {...inner} state={state} dispatch={dispatch}/>
                                </React.Fragment>
                            ))
                        }
                        </React.Fragment>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default GameBoard;