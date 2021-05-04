const TILE_HEIGHT = 60;
const TILE_WIDTH = 75.0;

const getWidthOffset = (offset) => (offset * TILE_WIDTH) + (TILE_WIDTH*1.0 / 2) + (0.75 * offset);
const getheightOffset = (offset) => (offset * TILE_HEIGHT) + (TILE_HEIGHT*1.0 / 2) + (0.75 * offset);

export const DrawStart = (c, drawStartX, drawStartY) => {
    let context = c.getContext("2d");
    context.beginPath();
    context.arc(getWidthOffset(drawStartX), getheightOffset(drawStartY), 7, 0, 2 * Math.PI);
    context.fillStyle = "#FFF";
    context.fill();
}

export const DrawJoiningLine = (c, drawStartX, drawStartY, drawEndX, drawEndY) => {
    let context = c.getContext("2d");
    context.beginPath();
    context.moveTo(getWidthOffset(drawStartX), getheightOffset(drawStartY));
    context.lineTo(getWidthOffset(drawEndX), getheightOffset(drawEndY));
    context.strokeStyle = "#FFF"
    context.lineWidth = 14;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.stroke();
}

export const ClearCanvas = (c) => {
    let context = c.getContext("2d");
    context.clearRect(0, 0, TILE_WIDTH * 8, TILE_HEIGHT * 12);
}