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

export const getDrawableForBuilding = (building: Building, image: HTMLImageElement): Drawable => {
    return {
        x: building.x,
        y: building.y,
        z: 0,
        image: image,
        direction: 3,
        alpha: 1
    };
};

export const loadBuildingImages = async () => {
    const house = await loadImage("./house.png");
    return {
        [BuildingType.house]: house
    };
}

export const getBuildingOverlay = (board: Board, ss: ScreenState, s: number, image: HTMLImageElement): Drawable => {
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

export const build = (gameState: GameState, board: Board, ss: ScreenState, s: number, type: BuildingType) => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;

    if (gameState.buildings.filter(b => b.x === x && b.y === y).length === 0) {
        gameState.buildings.push(
            {
                x: x,
                y: y,
                type: type
            }
        );
    }
};
