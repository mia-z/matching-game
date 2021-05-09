import React, { useRef, useEffect, useContext, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTile from "./GameTile";
import { ClearCanvas } from "./../gamelogic/OverlayControls";
import Konva from "konva";
import EndTurnChecker from "../gamelogic/EndTurnChecker";
import KonvaStore from "./../KonvaStore";

export const GameBoard = ({state, dispatch, grid}) => {
    const board = useRef(null);

    const { konva, UpdateKonva, InitKonva } = useContext(KonvaStore);

    const startDragging = useCallback((e) => {
        dispatch({ type: "DRAG_START" });
    }, [dispatch]);

    const stopDragging = useCallback((e) => {
        ClearCanvas(konva, UpdateKonva);
        EndTurnChecker(state, dispatch);
    }, [dispatch, konva, UpdateKonva, state]);

    useEffect(() => {
        InitKonva();
    }, []);

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
                <div height={726} width={726} id={"overlay"} className={"overlay-canvas"} />
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