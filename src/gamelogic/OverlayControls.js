import Konva from "konva";

const TILE_HEIGHT = 119.0;
const TILE_WIDTH = 119.0;

const getWidthOffset = (offset, sideLength) => (offset * sideLength) + (sideLength*1.0 / 2) + (0.5 * offset);
const getHeightOffset = (offset, sideLength) => (offset * sideLength) + (sideLength*1.0 / 2) + (0.5 * offset);

export const DrawStart = (k, set, drawStartX, drawStartY, sideLength) => {
    let layer = new Konva.Layer();

    let circle = new Konva.Circle({
        x: getWidthOffset(drawStartX, sideLength),
        y: getHeightOffset(drawStartY, sideLength),
        radius: 7,
        fill: "white",
    });

    let outline = new Konva.Line({
        points: [getWidthOffset(drawStartX, sideLength), getHeightOffset(drawStartY, sideLength)],
        strokeWidth: 24,
        lineCap: "round",
        lineJoin: "round",
        stroke: "black"
    })

    let fill = new Konva.Line({
        points: [getWidthOffset(drawStartX, sideLength), getHeightOffset(drawStartY, sideLength)],
        strokeWidth: 14,
        lineCap: "round",
        lineJoin: "round",
        stroke: "white"
    })

    layer.add(circle, outline, fill);
    layer.draw();
    k.add(layer);
}

export const DrawJoiningLine = (k, set, drawEndX, drawEndY, sideLength) => {
    let layer = k.getLayers()[0];

    let outline = layer.getChildren(x => x.getClassName() === "Line")[0];
    let fill = layer.getChildren(x => x.getClassName() === "Line")[1];

    outline.points(outline.points().concat([getWidthOffset(drawEndX, sideLength), getHeightOffset(drawEndY, sideLength)]));
    fill.points(fill.points().concat([getWidthOffset(drawEndX, sideLength), getHeightOffset(drawEndY, sideLength)]));

    layer.draw();
}

export const RemoveJoiningLine = (k, set) => {
    let layer = k.getLayers()[0];

    let outline = layer.getChildren(x => x.getClassName() === "Line")[0];
    let fill = layer.getChildren(x => x.getClassName() === "Line")[1];

    let outlineArray = outline.points().splice(0, outline.points().length - 2);
    let fillArray = fill.points().splice(0, fill.points().length - 2);

    outline.points(outlineArray);
    fill.points(fillArray);

    layer.draw();
}

export const ClearCanvas = (k, set) => {
    let layer = k.getLayers()[0];
    layer.destroy();
}