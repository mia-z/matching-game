import TileTypeGenerator from "./TileTypeGenerator";

<<<<<<< HEAD
export const TileGenerator = (tileWidth, tileHeight, x, y, type) => {
    let { iconPath, tileType, debugColor, isEnemy, enemyDamage, enemyHealth } = TileTypeGenerator(type);
    return {
        width: tileWidth,
        height: tileHeight,
=======
export const TileGenerator = (sideLength, x, y, type) => {
    let { iconPath, tileType, debugColor, isEnemy, enemyDamage, enemyHealth } = TileTypeGenerator(type);
    return {
        sideLength: sideLength,
>>>>>>> mobileAdaption
        selfX: x,
        selfY: y,
        isActive: false,
        iconPath, 
        tileType,
        debugColor,
        isEnemy,
        enemyDamage,
        enemyHealth
    }
}

export default TileGenerator;