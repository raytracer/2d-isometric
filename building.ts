import { Drawable } from ".";
import { Board, getNextCursorAdjacentTile } from "./board";
import { GameState } from "./gamestate";
import { s, ScreenState } from "./screen";
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

export enum BuildingType { house, large_block };

export const buildingTypes = [BuildingType.house, BuildingType.large_block];

export const buildingDimensions: { [key in BuildingType]: Dimension } = {
    [BuildingType.house]: {
        width: 1,
        height: 1
    },
    [BuildingType.large_block]: {
        width: 2,
        height: 2
    }
}

export const getDrawableForBuilding = (building: Building, image: HTMLImageElement, alpha: number): Array<Drawable> => {
    switch (building.type) {
        case BuildingType.house:
            return [{
                x: building.x,
                y: building.y,
                z: 0,
                xSrcOffset: 2,
                ySrcOffset: 2,
                xDestOffset: -8,
                yDestOffset: -8,
                height: image.height - 4,
                width: image.width / 4 - 4,
                image,
                alpha
            }];
        case BuildingType.large_block:
            return [{
                x: building.x,
                y: building.y,
                z: 0,
                xSrcOffset: (image.width / 4 - 4) / 4 + 2,
                ySrcOffset: 2,
                xDestOffset: -8,
                yDestOffset: -8,
                height: image.height - 4,
                width: (image.width / 4 - 4) / 2,
                image,
                alpha
            }, {
                x: building.x - 1,
                y: building.y,
                z: 0,
                xSrcOffset: 3 * (image.width / 4 - 4) / 4 + 2,
                ySrcOffset: 2,
                xDestOffset: (image.width / 4 - 4) / 4 - 18,
                yDestOffset: s / 2 - 8,
                height: image.height - 4,
                width: (image.width / 4 - 4) / 4,
                image,
                alpha
            }, {
                x: building.x,
                y: building.y - 1,
                z: 0,
                xSrcOffset: 2,
                ySrcOffset: 2,
                xDestOffset: 2,
                yDestOffset: s / 2 - 8,
                height: image.height - 4,
                width: (image.width / 4 - 4) / 4,
                image,
                alpha
            }];
    }
};

export const buildingImagePaths: { [key in BuildingType]: string } = {
    [BuildingType.house]: "./house.png",
    [BuildingType.large_block]: "./house_large.png"
};

export const loadBuildingImages = async (): Promise<{ [key in BuildingType]: HTMLImageElement }> => {
    let result: any = {};

    for (const [key, value] of Object.entries(buildingImagePaths)) {
        result[key] = await loadImage(value);
    }

    return result;
}

export const getBuildingOverlay = (board: Board, ss: ScreenState, s: number, type: BuildingType, image: HTMLImageElement): Array<Drawable> => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    return getDrawableForBuilding({ x, y, type }, image, 0.8);
}

export const build = (gameState: GameState, board: Board, ss: ScreenState, s: number, type: BuildingType) => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    gameState.buildings.push(
        {
            x: x,
            y: y,
            type: type
        }
    );
};
