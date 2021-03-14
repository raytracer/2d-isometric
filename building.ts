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
        draw: (ctx: CanvasRenderingContext2D) => {
            ctx.globalAlpha = 0.85;
            ctx.drawImage(
                image,
                2 + (image.width / 4) * 3,
                2,
                image.width / 4 - 4,
                image.height - 4,
                (s * (board.width - x + y) + ss.offsetX) * ss.scale, ((x + y) * (s / 2) + (defaultHeight - image.height) + ss.offsetY) * ss.scale,
                (image.width / 4 - 4) * ss.scale,
                (image.height - 4) * ss.scale
            );
            ctx.globalAlpha = 1.0;
        }
    };
}

export const build = (board: Board, ss: ScreenState, s: number, defaultHeight: number, image: HTMLImageElement, type: BuildingType) => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    board.drawables = board.drawables.filter(d => d.x !== x || d.y !== y);
    board.drawables.push({
        x: x,
        y: y,
        z: 0,
        draw: (ctx: CanvasRenderingContext2D) => {
            ctx.drawImage(
                image,
                2 + (image.width / 4) * 3,
                2,
                image.width / 4 - 4,
                image.height - 4,
                (s * (board.width - x + y) + ss.offsetX) * ss.scale, ((x + y) * (s / 2) + (defaultHeight - image.height) + ss.offsetY) * ss.scale,
                (image.width / 4 - 4) * ss.scale,
                (image.height - 4) * ss.scale
            );
        }
    });
};
