import React, { useReducer } from "react";
import GameStateReducer from "../reducers/GameStateReducer";
import "./../styles/base.scss";
import "./../styles/bootstrap-variants.scss";
import { InitialGameState } from "./../InitialGameState";
import GameBoard from "../components/GameBoard";
import InfoBox from "../components/InfoBox";
import { KonvaProvider } from "./../KonvaStore";

const Main = () => {
    const [gameState, gameDispatch] = useReducer(GameStateReducer, InitialGameState);

    return (
        <KonvaProvider>
            <div className={"debug-box flex flex-col"}>
                {
                    gameState.IsDragging ? 
                    <div className={"bg-red-400 text-right"}>down</div> : 
                    <div className={"bg-green-400 text-right"}>up</div>
                }
                <div>
                    StartTile:&nbsp;({gameState.StartTile.x}, {gameState.StartTile.y}), 
                    CurrentTile:&nbsp;({gameState.CurrentTile.x}, {gameState.CurrentTile.y})
                </div>
                {
                    gameState.SelectedTiles.map(({ selfX, selfY, tileType, isActive}) => (
                        <div key={`${selfX}${selfY}`}>
                            {tileType}-{isActive} -- ({selfX}, {selfY})
                        </div>
                    ))
                }
            </div>
            <div className={"mx-auto container flex justify-center"}>
                <GameBoard grid={gameState.GameGrid} state={gameState} dispatch={gameDispatch}/>
            </div>
            <div className={"mx-auto container flex justify-center"}>
                <InfoBox score={gameState.Score} dispatch={gameDispatch} />
            </div>
        </KonvaProvider>   
    )
}

export default Main;