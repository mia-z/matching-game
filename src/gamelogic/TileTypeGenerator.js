import RandomNumberGenerator from "./RandomNumberGenerator";

export const TileTypeGenerator = () => {
    let color = RandomNumberGenerator(1, 4);
    switch (color) {
        case 1: return "blue";
        case 2: return "purple";
        case 3: return "green";
        default: throw new Error("INVALID RANDOM GENERATED @ getRandom in InitialGameState")
    }
}

export default TileTypeGenerator;