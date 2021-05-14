import React, { useRef, useEffect, useContext, useState, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTileTwo from "./GameTileTwo";
import EndTurnChecker from "../gamelogic/EndTurnChecker";
import { Stage, Line, Layer, Circle, Group } from "react-konva";
import { GetExitDirection, NextTileOffsetFromDirection } from "./../gamelogic/Utils";
import Konva from "konva";
import CheckNextTile from "./../gamelogic/CheckNextTile";

const windowOffset = window.innerWidth - (window.innerWidth - (720 / 2) - 46);
const length = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
const tileSize = length /  6;

export const GameBoard = ({ state, dispatch }) => {
    const handleTouchStart = useCallback((e) => {
        const { selfX, selfY, tileType } = e;
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY, tileType: tileType } });
    }, [state, dispatch]);

    const handleTileTouchMove = useCallback((e) => {
        const { selfX, selfY } = e;
        const { LastSelectedTile } = state;
        
        if (selfX === LastSelectedTile.x && selfY === LastSelectedTile.y) {
            return; //do nothing and skip evaluation
        }

        let { CurrentTile: { x, y }, StartTileType, GameGrid, SelectedTiles } = state;

        let nextTileReturnCode = CheckNextTile(x, y, selfX, selfY, StartTileType, GameGrid, SelectedTiles);

        console.log(nextTileReturnCode);

        switch(nextTileReturnCode) {
            case 0: return; //NO MATCH - unused right now
            case 1: return dispatch({ type: "ADD_JOINING_TILE", payload: { x: e.selfX, y: e.selfY } });
            case 2: return dispatch({ type: "REMOVE_JOINING_TILE", payload: { x: e.selfX, y: e.selfY } }); 
            default: throw new Error("INVALID RETURN RECEIVED @ CheckNextTile in GameBoard.handleTileTouchMove")
        }
    }, [state, dispatch]);
    
    const handleTouchEnd = useCallback((e) => {
        EndTurnChecker(state, dispatch);
    }, [state, dispatch]);

    return (
        <Stage height={length} width={length}>
            <Layer>
                {
                    state.GameGrid.map((outer, outerIndex, outerArray) => (
                        <React.Fragment key={`y-${outerIndex}`}>
                        {
                            outer.map((inner, innerIndex, innerArray) => (
                                <React.Fragment key={`x-${innerIndex}`}>
                                    <GameTileTwo {...inner} touchStartHandler={handleTouchStart} touchEndHandler={handleTouchEnd} touchHandler={handleTileTouchMove} />
                                </React.Fragment>
                            ))
                        }
                        </React.Fragment>
                    ))
                }
                {   state.LinePoints.length > 0 &&
                    <Group>
                        <Line 
                            x={tileSize / 2} 
                            y={tileSize / 2}
                            points={state.LinePoints}
                            stroke={"black"}
                            tension={0.05}
                            strokeWidth={16}
                            lineJoin={"bevel"}
                            lineCap={"round"}
                            hitStrokeWidth={0}
                        />
                        <Line 
                            x={tileSize / 2} 
                            y={tileSize / 2}
                            points={state.LinePoints}
                            stroke={"white"}
                            tension={0.05}
                            strokeWidth={8}
                            lineJoin={"bevel"}
                            lineCap={"round"}
                            hitStrokeWidth={0}
                        />
                    </Group>
                }
                {   state.CurrentTile.x >= 0 && state.CurrentTile.y >= 0 &&
                    <Group x={state.CurrentTile.x * tileSize} y={state.CurrentTile.y * tileSize} onTouchEnd={handleTouchEnd}>
                        <Circle
                            radius={35}
                            x={0}
                            y={0}
                            stroke={"red"}
                        />
                        <Circle
                            radius={35}
                            x={tileSize}
                            y={0}
                            stroke={"red"}

                        />
                        <Circle
                            radius={35}
                            x={0}
                            y={tileSize}
                            stroke={"red"}

                        />
                        <Circle
                            radius={35}
                            x={tileSize}
                            y={tileSize}
                            stroke={"red"}

                        />
                    </Group>
                }
            </Layer>
        </Stage>  
    );
}

export default GameBoard;