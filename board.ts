import { Drawable } from ".";
import { ScreenState } from "./screen";
import { getRandomInt } from "./util";

export interface Board {
    drawables: Array<Drawable>
    width: number
    height: number
}

export const generateBoard = (height: number, width: number, ss: ScreenState, defaultHeight: number, images: Array<HTMLImageElement>) => {
    const result: Array<Drawable> = [];

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const choose = getRandomInt(images.length)
            const direction = getRandomInt(4)
            const img = images[choose];
            result.push({
                x: x, y: y, z: 0, draw: (ctx: CanvasRenderingContext2D) => {
                    const s = (img.width / 8) - 4;
                    ctx.drawImage(
                        img,
                        2 + (img.width / 4) * direction,
                        2,
                        img.width / 4 - 4,
                        img.height - 4,
                        (s * (width - x + y) + ss.offsetX) * ss.scale, ((x + y) * (s / 2) + (defaultHeight - img.height) + ss.offsetY) * ss.scale,
                        (img.width / 4 - 4) * ss.scale,
                        (img.height - 4) * ss.scale
                    );
                }
            });
        }
    }

    return result;
}

export const getNextCursorAdjacentTile = (board: Board, ss: ScreenState, s: number): Drawable => {
    let ox = (-board.width * s - ss.offsetX - s) / 2;
    let oy = (s + ss.offsetY) / 2;
    let x = Math.floor(((ss.cursorY / (2 * ss.scale) - oy) / (s / 2)) + ((-ss.cursorX / (ss.scale * 2) - ox) / s));
    let y = Math.floor(((ss.cursorY / (2 * ss.scale) - oy) / (s / 2)) - ((-ss.cursorX / (ss.scale * 2) - ox) / s));

    x = Math.min(board.width - 1, Math.max(0, x));
    y = Math.min(board.height - 1, Math.max(0, y));

    return board.drawables.filter(d => d.x === x && d.y === y)[0];
};
