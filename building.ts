import { Drawable } from ".";
import { Board, getNextCursorAdjacentTile } from "./board";
import { ScreenState } from "./screen";

export const getHouseOverlay = (board: Board, ss: ScreenState, s: number, defaultHeight: number, house: HTMLImageElement): Drawable => {
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
                house,
                2 + (house.width / 4) * 3,
                2,
                house.width / 4 - 4,
                house.height - 4,
                (s * (board.width - x + y) + ss.offsetX) * ss.scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + ss.offsetY) * ss.scale,
                (house.width / 4 - 4) * ss.scale,
                (house.height - 4) * ss.scale
            );
            ctx.globalAlpha = 1.0;
        }
    };
}

export const buildHouse = (board: Board, ss: ScreenState, s: number, defaultHeight: number, house: HTMLImageElement) => {
    const tile = getNextCursorAdjacentTile(board, ss, s);
    const x = tile.x;
    const y = tile.y;
    board.drawables.splice(board.drawables.indexOf(tile), 1);

    board.drawables = board.drawables.filter(d => d.x !== x || d.y !== y);
    board.drawables.push({
        x: x,
        y: y,
        z: 0,
        draw: (ctx: CanvasRenderingContext2D) => {
            ctx.drawImage(
                house,
                2 + (house.width / 4) * 3,
                2,
                house.width / 4 - 4,
                house.height - 4,
                (s * (board.width - x + y) + ss.offsetX) * ss.scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + ss.offsetY) * ss.scale,
                (house.width / 4 - 4) * ss.scale,
                (house.height - 4) * ss.scale
            );
        }
    });
};
