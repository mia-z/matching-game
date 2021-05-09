import React from "react";
import "./../styles/infobox.scss";
import { ProgressBar } from "react-bootstrap";

export const Infobox = ({ score }) => {
    return(
        <div className={"info-box-root"}>
            <div className={"info-box flex flex-row flex-wrap bg-red-400 text-2xl"}>
                <div className={"w-1/2 info-panel flex flex-row flex-wrap"}>
                    <div className={"text w-full"}>
                        Health:&nbsp;
                        <span className={"value"}>
                            {score.Health}/{score.MaxHealth}
                        </span>
                    </div>
                    <ProgressBar max={score.MaxHealth} variant={"health"} now={score.Health} className={"w-4/5"} />
                </div>
                <div className={"w-1/2 info-panel"}>
                    <div className={"text w-full text-right"}>
                        Armour:&nbsp;
                        <span className={"value"}>
                            {score.Armour}
                        </span>
                    </div>
                    <ProgressBar striped max={score.MaxArmour} variant={"armour"} now={score.Armour} className={"w-4/5 ml-auto"} />
                </div>
                <div className={"w-1/3 info-panel"}>
                    <div className={"text w-full text-yellow-300"}>
                        Gold:&nbsp;
                        <span className={"value text-white"}>
                            {score.Gold}
                        </span>
                    </div>
                </div>
                <div className={"w-1/3 info-panel"}>
                    <div className={"text w-full text-center text-purple-300"}>
                        Experience:&nbsp;
                        <span className={"value text-white"}>
                            {score.Experience}
                        </span>
                    </div>
                </div>
                <div className={"w-1/3 info-panel"}>
                    <div className={"text w-full text-right text-red-300"}>
                        Kills:&nbsp;
                        <span className={"value text-white"}>
                            N/a
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*
Score: {
        Gold: 0,
        Experience: 0,
        BaseDamage: 1,
        Health: 20,
        Armour: 10,
    }
*/
export default Infobox;