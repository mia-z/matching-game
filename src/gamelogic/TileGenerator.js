import TileTypeGenerator from "./TileTypeGenerator";

export const TileGenerator = (sideLength, x, y, type) => {
    let { iconPath, tileType, debugColor, isEnemy, enemyDamage, enemyHealth } = TileTypeGenerator(type);
    return {
        sideLength: sideLength,
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