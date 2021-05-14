import React, { useReducer } from "react";
import GameStateReducer from "../reducers/GameStateReducer";
import "./../styles/base.scss";
import "./../styles/bootstrap-variants.scss";
import { InitialGameState } from "./../InitialGameState";
import GameBoard from "../components/GameBoard";
import InfoBox from "../components/InfoBox";
import RandomNumberGenerator from "./../gamelogic/RandomNumberGenerator";

const entropy = Date.now();

const Main = () => {
    const [gameState, gameDispatch] = useReducer(GameStateReducer, InitialGameState);

    return (
        <div>
            <div className={"debug-box flex flex-col"}>
                {
                    gameState.IsDragging ? 
                    <div className={"bg-red-400 text-right"}>down</div> : 
                    <div className={"bg-green-400 text-right"}>up</div>
                }
                <div>
                    StartTile:&nbsp;({gameState.StartTile.x}, {gameState.StartTile.y})
                </div>
                <div>
                    CurrentTile:&nbsp;({gameState.CurrentTile.x}, {gameState.CurrentTile.y})
                </div>
                <div>
                    LastSelectedTile:&nbsp;({gameState.LastSelectedTile.x}, {gameState.LastSelectedTile.y})
                </div>
                {
                    gameState.SelectedTiles.map(({ selfX, selfY, tileType, isActive}) => (
                        <div key={`${RandomNumberGenerator(Math.floor(entropy / 2), entropy)}`}>
                            {tileType}-{isActive} -- ({selfX}, {selfY})
                        </div>
                    ))
                }
            </div>
            <div className={"mx-auto container flex justify-center"}>
                <GameBoard state={gameState} dispatch={gameDispatch}/>
            </div>
            <div className={"mx-auto container flex justify-center"}>
                <InfoBox score={gameState.Score} dispatch={gameDispatch} />
            </div>
        </div>   
    )
}

export default Main;