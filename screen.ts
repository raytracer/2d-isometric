import { Board } from "./board";
import { BuildingType } from "./building";

export interface ScreenState {
    scale: number;
    offsetX: number;
    offsetY: number;
    cursorX: number;
    cursorY: number;
    moveX: number;
    moveY: number;
    buildMode: null | BuildingType;
}
export const s = 78;

export const setUpCanvas = (canvas: HTMLCanvasElement, ss: ScreenState) => {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const interfaceRight = 200;
    const interfaceTop = 20;
    canvas.width = vw - interfaceRight;
    canvas.height = vh - interfaceTop;

    canvas.addEventListener("mousemove", event => {
        ss.moveX = 0;
        ss.moveY = 0;

        const speed = 10;
        const edge = 30;

        if (event.offsetX < edge) {
            ss.moveX = speed;
        }

        if (event.offsetY < edge) {
            ss.moveY = speed;
        }

        if (event.offsetX > (canvas as HTMLCanvasElement).width - edge) {
            ss.moveX = -speed;
        }

        if (event.offsetY > (canvas as HTMLCanvasElement).height - edge) {
            ss.moveY = -speed;
        }
    });

    canvas.addEventListener("mouseleave", event => {
        ss.moveX = 0;
        ss.moveY = 0;
    });

    canvas.addEventListener("mousemove", event => {
        ss.cursorX = event.offsetX;
        ss.cursorY = event.offsetY;
    });

    document.addEventListener("keyup", event => {
        switch (event.key) {
            case "w":
                ss.scale = Math.min(ss.scale + 0.25, 1.5);
                console.log(ss.scale);
                break;
            case "s":
                ss.scale = Math.max(0.5, ss.scale - 0.25);
                break;
        }
    });
};

export const draw = (ctx: CanvasRenderingContext2D, x: number, y: number, board: Board, ss: ScreenState, img: HTMLImageElement, direction: number, alpha: number) => {
    const actualS = (img.width / 4 - 4);
    const dx = (s * (board.width - x + y) + ss.offsetX - (actualS - s) / 2) * ss.scale;
    const dy = ((x + y) * (s / 2) - img.height + ss.offsetY) * ss.scale;
    ctx.globalAlpha = alpha;
    ctx.drawImage(
        img,
        2 + (img.width / 4) * direction,
        2,
        img.width / 4 - 4,
        img.height - 4,
        dx, dy,
        (img.width / 4 - 4) * ss.scale,
        (img.height - 4) * ss.scale
    );
    ctx.globalAlpha = 1.0;
}