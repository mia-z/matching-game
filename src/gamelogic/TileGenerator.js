import TileTypeGenerator from "./TileTypeGenerator";

export const TileGenerator = (tileWidth, tileHeight, x, y, joiningStyle = "dot") => {
    let { iconPath, tileType } = TileTypeGenerator();
    return {
        width: tileWidth,
        height: tileHeight,
        selfX: x,
        selfY: y,
        isActive: false,
        joiningStyle: joiningStyle,
        iconPath, 
        tileType
    }
}

export default TileGenerator;