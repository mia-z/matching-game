export const NextTileOffsetFromDirection = (x, y, direction) => {
    switch(direction) {
        case "up": return { x: x, y: y - 1 };
        case "right": return { x: x + 1, y: y };
        case "down": return { x: x, y: y + 1 };
        case "left": return { x: x - 1, y: y };
        case "left-up": return { x: x - 1, y: y - 1 };
        case "right-up": return { x: x + 1, y: y - 1 };
        case "right-down": return { x: x + 1, y: y + 1 };
        case "left-down": return { x: x - 1, y: y + 1 };
        default: throw new Error("INVALID DIRECTION RECEIVED IN NextCoordinatesFromDirection -- RECEIVED: " + direction);
    }
}

export const GetExitDirection = (x, y, sideLength) => {
    if (y <= 2) {
        if (x <= sideLength*0.15) 
            return "left-up";
        else if (x >= sideLength - (sideLength*0.15)) 
            return "right-up";
        else
            return "up";
    }

    if (y > sideLength - 4) {
        if (x <= sideLength*0.15) 
            return "left-down";
        else if (x >= sideLength - (sideLength*0.15)) 
            return "right-down";
        else
            return "down";
    }

    if (x <= 2) {
        if (y <= sideLength*0.15) 
            return "left-up";
        else if (y >= sideLength - (sideLength*0.15)) 
            return "left-down";
        else
            return "left";
    }
    if (x > sideLength - 4) {
        if (y <= sideLength*0.15) 
            return "right-up";
        else if (y >= sideLength - (sideLength*0.15)) 
            return "right-down";
        else
            return "right";
    }
};

export const rtd = (deg) => deg*Math.PI/180;