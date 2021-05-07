import RandomNumberGenerator from "./RandomNumberGenerator";
import * as icon from "./../IconRepo";

export const TileTypeGenerator = (t) => {
    let type = t || RandomNumberGenerator(1, 6);
    switch (type) {
        case 1: return {
            tileType: "sword", 
            iconPath: icon.Sword,
            debugColor: "grey"
        };
        case 2: return {
            tileType: "shield", 
            iconPath: icon.Shield,
            debugColor: "blue"
        };
        case 3: return {
            tileType: "health-potion", 
            iconPath: icon.HealthPotion,
            debugColor: "red"
        };
        case 4: return {
            tileType: "coin", 
            iconPath: icon.Coin,
            debugColor: "yellow"
        };
        case 5: return {
            tileType: "enemy", 
            iconPath: icon.Enemy,
            debugColor: "white"
        };
        default: throw new Error("INVALID RANDOM GENERATED @ TileTypeGenerator in TileTypeGenerator")
    }
}

export default TileTypeGenerator;