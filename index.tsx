import { Fragment, h, render } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { Board, generateBoard } from "./board";
import { build, BuildingType, getBuildingOverlay, loadBuildingImages } from "./building";
import { GameState, updateState } from "./gamestate";
import { draw, ScreenState, setUpCanvas } from "./screen";
import { loadImage } from "./util";

export interface Drawable {
    x: number;
    y: number;
    z: number;
    image: HTMLImageElement;
    direction: number;
    alpha: number;
}

export const divider = window.navigator.platform.toLowerCase().indexOf("mac") === -1 ? window.devicePixelRatio : 1;

const screenState: ScreenState = {
    scale: 1.0,
    offsetX: 0,
    offsetY: 0,
    cursorX: 0,
    cursorY: 0,
    moveX: 0,
    moveY: 0
}

const start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const buildingImages = await loadBuildingImages();
    const s = (buildingImages[BuildingType.house].width / 8) - 4;
    const defaultHeight = images[0].height;
    const width = 12;
    const height = 12;


    let board: Board = {
        width: width,
        height: height,
        drawables: generateBoard(height, width, images)
    }

    function Isometric(props: any) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        let gameState: GameState = { buildMode: false };

        useEffect(() => {
            const canvas = canvasRef.current;
            let lastTime: number | null = null;
            if (canvas) {
                setUpCanvas(canvas, screenState);
                let animationFrameId: number;
                const drawBoard = (time: number) => {
                    const timeFactor = lastTime === null ? 0 : (time - lastTime) / 10;
                    lastTime = time;
                    screenState.offsetX += timeFactor * screenState.moveX / divider / screenState.scale;
                    screenState.offsetY += timeFactor * screenState.moveY / divider / screenState.scale;

                    gameState = updateState(gameState, time - lastTime);

                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        const allDrawables = [...board.drawables];
                        if (gameState.buildMode) allDrawables.push(getBuildingOverlay(board, screenState, s, defaultHeight, buildingImages[BuildingType.house], BuildingType.house));
                        allDrawables.sort((a, b) => (a.x + a.y) < (b.x + b.y) ? -1 : 1).forEach(d => draw(ctx, d.x, d.y, board, screenState, defaultHeight, d.image, d.direction, d.alpha));
                    }

                    animationFrameId = requestAnimationFrame(drawBoard);
                };

                requestAnimationFrame(drawBoard)

                return () => {
                    window.cancelAnimationFrame(animationFrameId);
                }
            }
        }, []);

        return (
            <Fragment>
                <div className="top">top</div>
                <div className="main">
                    <canvas onMouseUp={() => { if (gameState.buildMode) build(board, screenState, s, defaultHeight, buildingImages[BuildingType.house], BuildingType.house); }} ref={canvasRef} id="main-canvas" width="1500" height="1000"></canvas>
                    <div className="right"><button onClick={() => { gameState.buildMode = !gameState.buildMode; }}>Build House</button></div>
                </div>
            </Fragment>
        );
    }

    render(<Isometric />, document.body);
};

start();
