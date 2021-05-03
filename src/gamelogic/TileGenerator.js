import TileTypeGenerator from "./TileTypeGenerator";

export const TileGenerator = (tileWidth, tileHeight, x, y, joiningStyle = "dot") => {
    return {
        width: tileWidth,
        height: tileHeight,
        selfX: x,
        selfY: y,
        tileType: TileTypeGenerator(),
        isActive: false,
        joiningStyle: joiningStyle
    }
}

export default TileGenerator;