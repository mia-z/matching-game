const TILE_HEIGHT = 60;
const TILE_WIDTH = 75.0;

const getWidthOffset = (offset) => (offset * TILE_WIDTH) + (TILE_WIDTH*1.0 / 2) + (0.75 * offset);
const getHeightOffset = (offset) => (offset * TILE_HEIGHT) + (TILE_HEIGHT*1.0 / 2) + (0.5 * offset);

export const DrawStart = (c, drawStartX, drawStartY) => {
    let context = c.getContext("2d");
    context.beginPath();
    context.arc(getWidthOffset(drawStartX), getHeightOffset(drawStartY), 7, 0, 2 * Math.PI);
    context.fillStyle = "#FFF";
    context.fill();
}

export const DrawJoiningLine = (c, drawStartX, drawStartY, drawEndX, drawEndY) => {
    let context = c.getContext("2d");
    context.beginPath();
    context.moveTo(getWidthOffset(drawStartX), getHeightOffset(drawStartY));
    context.lineTo(getWidthOffset(drawEndX), getHeightOffset(drawEndY));
    context.strokeStyle = "#FFF"
    context.lineWidth = 14;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
}

export const RemoveJoiningLine = (c, drawStartX, drawStartY, drawEndX, drawEndY, direction) => {
    let context = c.getContext("2d");
    context.beginPath();
    switch(direction) {
        case "up":
            context.clearRect(getWidthOffset(drawStartX) - 8, getHeightOffset(drawStartY) - TILE_HEIGHT, 16, TILE_HEIGHT + 7);
            break;
        case "down": 
            context.clearRect(getWidthOffset(drawStartX) - 8, getHeightOffset(drawStartY) - 8, 16, TILE_HEIGHT + 7);
            break;
        case "left": 
            context.clearRect(getWidthOffset(drawStartX) - TILE_WIDTH, getHeightOffset(drawStartY) - 8, TILE_WIDTH + 7, 16);
            break;
        case "right": 
        context.clearRect(getWidthOffset(drawStartX) - 9, getHeightOffset(drawStartY) - 8, TILE_WIDTH + 8, 16);
            break;
        default: throw new Error("INVALID DIRECTION GIVEN @ OverlayControls IN RemoveJoiningLine");
    }
    context.arc(getWidthOffset(drawEndX), getHeightOffset(drawEndY), 7, 0, 2 * Math.PI);
    context.fill();
}

export const ClearCanvas = (c) => {
    let context = c.getContext("2d");
    context.clearRect(0, 0, TILE_WIDTH * 8, TILE_HEIGHT * 12);
}