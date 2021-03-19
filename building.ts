import { Drawable } from ".";
import { Board, getNextCursorAdjacentTile } from "./board";
import { GameState } from "./gamestate";
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

export const getDrawableForBuilding = (building: Building, image: HTMLImageElement): Drawable => {
    return {
        x: building.x,
        y: building.y,
        z: 0,
        dimension: buildingDimensions[building.type],
        image: image,
        direction: 3,
        alpha: 1
    };
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

export const getBuildingOverlay = (board: Board, ss: ScreenState, s: number, type: BuildingType, image: HTMLImageElement): Drawable => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    return {
        x: x,
        y: y,
        z: 1,
        dimension: buildingDimensions[type],
        image: image,
        direction: 3,
        alpha: 0.8
    };
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
