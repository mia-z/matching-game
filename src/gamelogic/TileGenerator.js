import TileTypeGenerator from "./TileTypeGenerator";

export const TileGenerator = (tileWidth, tileHeight, x, y, type) => {
    let { iconPath, tileType, debugColor, isEnemy, enemyDamage, enemyHealth } = TileTypeGenerator(type);
    return {
        width: tileWidth,
        height: tileHeight,
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