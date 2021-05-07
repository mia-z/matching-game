export const NextCoordinatesFromDirection = (x, y, direction) => {
    console.log(x, y, direction);
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

export const GetExitDirection = (x, y, width = 75, height = 60) => {
    if (y <= -0.5) {
        if (x <= 20) 
            return "left-up";
        else if (x >= 70) 
            return "right-up";
        else
            return "up";
    }

    if (y > 89) {
        if (x <= 20) 
            return "left-down";
        else if (x >= 70) 
            return "right-down";
        else
            return "down";
    }

    if (x <= -0.5) {
        if (y <= 20) 
            return "left-up";
        else if (y >= 70) 
            return "left-down";
        else
            return "left";
    }
    if (x > 89) {
        if (y <= 20) 
            return "right-up";
        else if (y >= 70) 
            return "right-down";
        else
            return "right";
    }
};

export const rtd = (deg) => deg*Math.PI/180;