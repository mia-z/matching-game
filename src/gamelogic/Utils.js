export const NextCoordinatesFromDirection = (x, y, direction) => {
    switch(direction) {
        case "up": return { x: x, y: y - 1 };
        case "right": return { x: x + 1, y: y };
        case "down": return { x: x, y: y + 1 };
        case "left": return { x: x - 1, y: y };
        default: throw new Error("INVALID DIRECTION RECEIVED IN NextCoordinatesFromDirection -- RECEIVED: " + direction);
    }
}
