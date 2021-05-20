import React, { useRef, useEffect, useContext, useCallback } from "react";
import "./../styles/gameboard.scss";
import GameTileTwo from "./GameTileTwo";
import EndTurnChecker from "../gamelogic/EndTurnChecker";
import { Stage, Line, Layer, Circle, Group, Image } from "react-konva";
import { GetExitDirection, NextTileOffsetFromDirection } from "./../gamelogic/Utils";
import Konva from "konva";
import CheckNextTile from "./../gamelogic/CheckNextTile";
import { Spring, animated } from "@react-spring/konva/index";
import useImage from "use-image";

const windowOffset = window.innerWidth - (window.innerWidth - (720 / 2) - 46);
const length = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
const tileSize = length /  6;

export const GameBoard = ({ state, dispatch }) => {
    const trailOutline = useRef(null);
    const trailFill = useRef(null);

    const tileRefs = useRef(new Array());

    const touchStartHandler = useCallback((e) => {
        const { selfX, selfY, tileType } = e;
        console.log(e.ref);
        dispatch({ type: "SET_START_TILE", payload: { x: selfX, y: selfY, tileType: tileType } });
    }, [state, dispatch, tileRefs]);

    const touchMoveHandler = useCallback((e) => {
        const { selfX, selfY } = e;
        const { LastSelectedTile } = state;
        
        if (selfX === LastSelectedTile.x && selfY === LastSelectedTile.y) {
            return; //do nothing and skip evaluation
        }

        let { CurrentTile: { x, y }, StartTileType, GameGrid, SelectedTiles } = state;

        let nextTileReturnCode = CheckNextTile(x, y, selfX, selfY, StartTileType, GameGrid, SelectedTiles);

        //console.log(nextTileReturnCode);

        switch(nextTileReturnCode) {
            case 0: return; //NO MATCH - unused right now
            case 1: return dispatch({ type: "ADD_JOINING_TILE", payload: { x: e.selfX, y: e.selfY } });
            case 2: return dispatch({ type: "REMOVE_JOINING_TILE", payload: { x: e.selfX, y: e.selfY } }); 
            default: throw new Error("INVALID RETURN RECEIVED @ CheckNextTile in GameBoard.handleTileTouchMove")
        }
    }, [state, dispatch, tileRefs]);
    
    const touchEndHandler = useCallback((e) => {
        EndTurnChecker(state, dispatch, tileRefs);
    }, [state, dispatch, tileRefs]);

    useEffect(() => {
        if (state.LinePoints.length > 2) {
            trailOutline.current.points([...state.LinePoints.slice(0, -2)]);
            trailOutline.current.to({
                points: [...state.LinePoints],
                duration: 0.1
            })

            trailFill.current.points([...state.LinePoints.slice(0, -2)]);
            trailFill.current.to({
                points: [...state.LinePoints],
                duration: 0.1
            })
        }
    }, [state.LinePoints, trailOutline, trailFill])

    useEffect(() => {
        console.log(tileRefs);
    }, [tileRefs]);

    return (
        <Stage height={length} width={length}>
            <Layer>
                {
                    state.GameGrid.map((outer, outerIndex, outerArray) => (
                        <React.Fragment key={`${outerIndex}`}>
                            {
                                outer.map((inner, innerIndex, innerArray) => {
                                    const getRef = (el) => (tileRefs.current[inner.id] = el)
                                    const [icon] = useImage(inner.iconPath);
                                    return(
                                        <React.Fragment key={innerIndex}>
                                            <Group 
                                                id={`${innerIndex}${outerIndex}`}
                                                ref={ref => getRef(ref)}
                                                x={inner.selfX * inner.sideLength} 
                                                y={inner.selfY * inner.sideLength}
                                                width={inner.sideLength} 
                                                height={inner.sideLength}
                                                onTouchMove={(e) => touchMoveHandler({...e, ...inner, ref: tileRefs.current[inner.id]})}
                                                onTouchStart={(e) => touchStartHandler({...e, ...inner, ref: tileRefs.current[inner.id]})}
                                                onTouchEnd={(e) => touchEndHandler({...e, ...inner, ref: tileRefs.current[inner.id]})}
                                            >
                                                <Image image={icon} />
                                            </Group>
                                        </React.Fragment>
                                    )
                                })
                            }
                        </React.Fragment>
                    ))
                }
            </Layer>
            <Layer>
                {   state.LinePoints.length > 0 &&
                    <Group>
                        <Line 
                            ref={trailOutline}
                            x={tileSize / 2} 
                            y={tileSize / 2}
                            //points={state.LinePoints}
                            stroke={"black"}
                            tension={0.05}
                            strokeWidth={24}
                            lineJoin={"bevel"}
                            lineCap={"round"}
                            hitStrokeWidth={0}
                        />
                        <Line 
                            ref={trailFill}
                            x={tileSize / 2} 
                            y={tileSize / 2}
                            //points={state.LinePoints}
                            stroke={"white"}
                            tension={0.05}
                            strokeWidth={12}
                            lineJoin={"bevel"}
                            lineCap={"round"}
                            hitStrokeWidth={0}
                        />
                    </Group>
                }
                {   state.CurrentTile.x >= 0 && state.CurrentTile.y >= 0 &&
                    <Group x={state.CurrentTile.x * tileSize} y={state.CurrentTile.y * tileSize} onTouchEnd={touchEndHandler}>
                        <Circle
                            radius={35}
                            x={0}
                            y={0}
                        />
                        <Circle
                            radius={35}
                            x={tileSize}
                            y={0}
                        />
                        <Circle
                            radius={35}
                            x={0}
                            y={tileSize}
                        />
                        <Circle
                            radius={35}
                            x={tileSize}
                            y={tileSize}
                        />
                    </Group>
                }
            </Layer>
        </Stage>  
    );
}

export default GameBoard;