import { Fragment, h, render } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { Board, generateBoard, getDrawableForTile, loadTileImages } from "./board";
import { build, buildingDimensions, buildingImagePaths, BuildingType, buildingTypes, Dimension, getBuildingOverlay, getDrawableForBuilding, loadBuildingImages } from "./building";
import { GameState, updateState } from "./gamestate";
import { draw, s, ScreenState, setUpCanvas } from "./screen";
import { loadImage } from "./util";

export interface Drawable {
    x: number;
    y: number;
    z: number;
    xDestOffset: number;
    yDestOffset: number;
    xSrcOffset: number;
    ySrcOffset: number;
    height: number;
    width: number;
    image: HTMLImageElement;
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
    moveY: 0,
    buildMode: null
}

const start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const buildingImages = await loadBuildingImages();
    const tileImages = await loadTileImages();
    const width = 12;
    const height = 12;


    let board: Board = generateBoard(height, width, images);

    function Isometric(props: any) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        let gameState: GameState = { buildings: [] };

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
                        const buildingDrawables = gameState.buildings.map(b => getDrawableForBuilding(b, buildingImages[b.type], 1.0)).flat();
                        let allDrawables = [...board.tiles.map(t => getDrawableForTile(t, tileImages[t.type])).flat(), ...buildingDrawables];
                        if (screenState.buildMode !== null) allDrawables = [...allDrawables, ...getBuildingOverlay(board, screenState, s, screenState.buildMode, buildingImages[screenState.buildMode])];
                        allDrawables.sort((a, b) => {
                            return (a.x + a.y + a.z) < (b.x + b.y + b.z) ? -1 : 1
                        }).forEach(d => draw(ctx, board, screenState, d));
                    }

                    animationFrameId = requestAnimationFrame(drawBoard);
                };

                requestAnimationFrame(drawBoard)

                return () => {
                    window.cancelAnimationFrame(animationFrameId);
                }
            }
        }, []);

        const renderBuildingButtons = () => {
            return buildingTypes.map(t => <div className="building"><button onClick={() => { screenState.buildMode = t }}><img src={buildingImagePaths[t]}></img></button></div>);
        };

        return (
            <Fragment>
                <div className="top">top</div>
                <div className="main">
                    <canvas onMouseUp={() => { if (screenState.buildMode !== null) build(gameState, board, screenState, s, screenState.buildMode); }} ref={canvasRef} id="main-canvas" width="1500" height="1000"></canvas>
                    <div className="right">
                        <h2>Buildings</h2>
                        {renderBuildingButtons()}
                    </div>
                </div>
            </Fragment>
        );
    }

    render(<Isometric />, document.body);
};

start();
