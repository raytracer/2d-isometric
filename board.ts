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

export enum TileType { ground, grass, flowers, dirt, sea, coast, coast_corner }

export const tileTypes = [TileType.ground, TileType.grass, TileType.flowers, TileType.dirt, TileType.sea, TileType.coast, TileType.coast_corner];

export const tileImagePaths: { [key in TileType]: string } = {
    [TileType.ground]: "./ground.png",
    [TileType.grass]: "./grass.png",
    [TileType.flowers]: "./flowers.png",
    [TileType.dirt]: "./dirt.png",
    [TileType.sea]: "./sea.png",
    [TileType.coast]: "./coast.png",
    [TileType.coast_corner]: "./coast_corner.png"
};

export const loadTileImages = async (): Promise<{ [key in TileType]: HTMLImageElement }> => {
    let result: any = {};

    for (const [key, value] of Object.entries(tileImagePaths)) {
        result[key] = await loadImage(value);
    }

    return result;
}

export const getDrawableForTile = (tile: Tile, img: HTMLImageElement) => {
    switch (tile.type) {
        case TileType.ground:
        case TileType.grass:
        case TileType.flowers:
        case TileType.dirt:
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
        case TileType.sea:
        case TileType.coast:
        case TileType.coast_corner:
            return {
                x: tile.x,
                y: tile.y,
                z: 0,
                xDestOffset: 0,
                yDestOffset: 17,
                xSrcOffset: (img.width / 4) * tile.offset + 2,
                ySrcOffset: 2,
                width: (img.width / 4) - 4,
                height: img.height - 4,
                image: img,
                alpha: 1.0
            }
    }
}

export const generateBoard = (height: number, width: number, images: Array<HTMLImageElement>): Board => {
    const tiles: Array<Tile> = [];

    for (let x = 2; x < width - 2; x++) {
        for (let y = 2; y < height - 2; y++) {
            const choose = getRandomInt(4)
            const direction = getRandomInt(4)
            tiles.push({
                x: x,
                y: y,
                type: tileTypes[choose],
                offset: direction
            });
        }
    }

    for (let y = 0; y < height; y++) {
        tiles.push({
            x: 0,
            y: y,
            type: TileType.sea,
            offset: 0
        });
        tiles.push({
            x: width - 1,
            y: y,
            type: TileType.sea,
            offset: 0
        });
    }

    for (let x = 1; x < width - 1; x++) {
        tiles.push({
            x,
            y: 0,
            type: TileType.sea,
            offset: 0
        });
        tiles.push({
            x,
            y: height - 1,
            type: TileType.sea,
            offset: 0
        });
    }

    for (let x = 2; x < width - 2; x++) {
        tiles.push({
            x,
            y: 1,
            type: TileType.coast,
            offset: 3
        });
        tiles.push({
            x,
            y: height - 2,
            type: TileType.coast,
            offset: 1
        });
    }

    for (let y = 2; y < height - 2; y++) {
        tiles.push({
            x: 1,
            y,
            type: TileType.coast,
            offset: 2
        });
        tiles.push({
            x: width - 2,
            y,
            type: TileType.coast,
            offset: 0
        });
    }

    tiles.push({
        x: 1,
        y: 1,
        type: TileType.coast_corner,
        offset: 2
    });
    tiles.push({
        x: width - 2,
        y: 1,
        type: TileType.coast_corner,
        offset: 3
    });
    tiles.push({
        x: 1,
        y: height - 2,
        type: TileType.coast_corner,
        offset: 1
    });
    tiles.push({
        x: width - 2,
        y: height - 2,
        type: TileType.coast_corner,
        offset: 0
    });

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
