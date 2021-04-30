import React, { useReducer } from "react";
import GameStateReducer from "../reducers/GameStateReducer";
import "./../styles/base.scss";
import { InitialGameState } from "./../InitialGameState";
import GameBoard from "../components/GameBoard";


const Main = () => {
    const [gameState, gameDispatch] = useReducer(GameStateReducer, InitialGameState);

    return(
        <div className={"mx-auto container flex justify-center"}>
            <GameBoard grid={gameState.GameGrid} state={gameState} dispatch={gameDispatch}/>
        </div>
    )
}

export default Main;