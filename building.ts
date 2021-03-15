import { Drawable } from ".";
import { Board, getNextCursorAdjacentTile } from "./board";
import { ScreenState } from "./screen";
import { loadImage } from "./util";

export interface Building {
    x: number;
    y: number;
    type: BuildingType;
}

export interface Dimension {
    width: number;
    height: number;
}

export enum BuildingType { house };

const getDimension = (building: BuildingType): Dimension => {
    switch (building) {
        case BuildingType.house:
            return {
                width: 1,
                height: 1
            }
    }
}

export const loadBuildingImages = async () => {
    const house = await loadImage("./house.png");
    return {
        [BuildingType.house]: house
    };
}

export const getBuildingOverlay = (board: Board, ss: ScreenState, s: number, defaultHeight: number, image: HTMLImageElement, type: BuildingType): Drawable => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    return {
        x: x,
        y: y,
        z: 0,
        image: image,
        direction: 3,
        alpha: 0.8
    };
}

export const build = (board: Board, ss: ScreenState, s: number, defaultHeight: number, image: HTMLImageElement, type: BuildingType) => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    board.drawables = board.drawables.filter(d => d.x !== x || d.y !== y);
    board.drawables.push(
        {
            x: x,
            y: y,
            z: 0,
            image: image,
            direction: 3,
            alpha: 1.0
        });
};
