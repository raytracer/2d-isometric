import { Drawable } from ".";
import { ScreenState } from "./screen";
import { getRandomInt, loadImage } from "./util";

export interface Board {
    tiles: Array<Tile>
    width: number
    height: number
}

export interface Tile {
    x: number;
    y: number;
    offset: number;
    type: TileType;
}

export enum TileType { grass, flowers, dirt }

export const tileTypes = [TileType.grass, TileType.flowers, TileType.dirt];

export const tileImagePaths: { [key in TileType]: string } = {
    [TileType.grass]: "./grass.png",
    [TileType.flowers]: "./flowers.png",
    [TileType.dirt]: "./dirt.png"
};

export const loadTileImages = async (): Promise<{ [key in TileType]: HTMLImageElement }> => {
    let result: any = {};

    for (const [key, value] of Object.entries(tileImagePaths)) {
        result[key] = await loadImage(value);
    }

    return result;
}

export const getDrawableForTile = (tile: Tile, img: HTMLImageElement) => {
    return {
        x: tile.x,
        y: tile.y,
        z: 0,
        xDestOffset: 0,
        yDestOffset: 0,
        xSrcOffset: (img.width / 4) * tile.offset + 2,
        ySrcOffset: 2,
        width: (img.width / 4) - 4,
        height: img.height - 4,
        image: img,
        alpha: 1.0
    }
}

export const generateBoard = (height: number, width: number, images: Array<HTMLImageElement>): Board => {
    const tiles: Array<Tile> = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const choose = getRandomInt(tileTypes.length)
            const direction = getRandomInt(4)
            tiles.push({
                x: x,
                y: y,
                type: tileTypes[choose],
                offset: direction
            });
        }
    }

    return {
        width, height, tiles
    };
}

export const getNextCursorAdjacentTile = (board: Board, ss: ScreenState, s: number) => {
    let ox = (-board.width * s - ss.offsetX - s) / 2;
    let oy = (ss.offsetY - s) / 2;
    let x = Math.floor(((ss.cursorY / (2 * ss.scale) - oy) / (s / 2)) + ((-ss.cursorX / (ss.scale * 2) - ox) / s));
    let y = Math.floor(((ss.cursorY / (2 * ss.scale) - oy) / (s / 2)) - ((-ss.cursorX / (ss.scale * 2) - ox) / s));

    x = Math.min(board.width - 1, Math.max(0, x));
    y = Math.min(board.height - 1, Math.max(0, y));

    return {
        x: x,
        y: y
    };
};
