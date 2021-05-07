import Konva from "konva";

const TILE_HEIGHT = 90.0;
const TILE_WIDTH = 90.0;

const getWidthOffset = (offset) => (offset * TILE_WIDTH) + (TILE_WIDTH*1.0 / 2) + (0.5 * offset);
const getHeightOffset = (offset) => (offset * TILE_HEIGHT) + (TILE_HEIGHT*1.0 / 2) + (0.5 * offset);

export const DrawStart = (k, drawStartX, drawStartY) => {
    let circle = new Konva.Circle({
        x: getWidthOffset(drawStartX),
        y: getHeightOffset(drawStartY),
        radius: 7,
        fill: "white",
        id: 0
    });
    k.layer.add(circle);
    k.layer.draw();
}

export const DrawJoiningLine = (k, drawStartX, drawStartY, drawEndX, drawEndY) => {
    let line = new Konva.Line({
        points: [
            getWidthOffset(drawStartX), getHeightOffset(drawStartY),
            getWidthOffset(drawEndX), getHeightOffset(drawEndY)
        ],
        stroke: "white",
        strokeWidth: 15,
        lineCap: "round",
        lineJoin: "round",
    });
    k.layer.add(line);
    k.lines.push(line);
    k.layer.draw();
}

export const RemoveJoiningLine = (k, drawStartX, drawStartY, drawEndX, drawEndY, direction) => {
    k.lines[k.lines.length-1].destroy();
    k.lines.pop();
    k.layer.draw();
}

export const ClearCanvas = (k) => {
    k.layer.destroyChildren();
    k.lines = [];
    k.layer.draw();
}