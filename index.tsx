import { Fragment, h, render } from "preact";
import { useRef, useEffect, useState } from "preact/hooks";

const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

interface Drawable {
    x: number;
    y: number;
    z: number;
    draw: (ctx: CanvasRenderingContext2D) => void;
}

let scale = 1.0;
let offsetX = 0;
let offsetY = 0;
const divider = window.navigator.platform.toLowerCase().indexOf("mac") === -1 ? window.devicePixelRatio : 1;

let cursorX = 0;
let cursorY = 0;

let moveX = 0;
let moveY = 0;

const start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const house = await loadImage("./house.png");
    const s = (house.width / 8) - 4;
    const defaultHeight = images[0].height;
    const width = 12;
    const height = 12;

    const generateBoard = (height: number, width: number) => {
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
                            (s * (width - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - img.height) + offsetY) * scale,
                            (img.width / 4 - 4) * scale,
                            (img.height - 4) * scale
                        );
                    }
                });
            }
        }

        return result;
    }

    let board = await generateBoard(height, width);

    const getNextCursorAdjacentTile = (): Drawable => {
        let ox = (-width * s - offsetX - s) / 2;
        let oy = (s + offsetY) / 2;
        let x = Math.floor(((cursorY / (2 * scale) - oy) / (s / 2)) + ((-cursorX / (scale * 2) - ox) / s));
        let y = Math.floor(((cursorY / (2 * scale) - oy) / (s / 2)) - ((-cursorX / (scale * 2) - ox) / s));

        x = Math.min(width - 1, Math.max(0, x));
        y = Math.min(height - 1, Math.max(0, y));

        return board.filter(d => d.x === x && d.y === y)[0];
    };

    const buildHouse = () => {
        const tile = getNextCursorAdjacentTile();
        const x = tile.x;
        const y = tile.y;
        board.splice(board.indexOf(tile), 1);

        board = board.filter(d => d.x !== x || d.y !== y);
        board.push({
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
                    (s * (width - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + offsetY) * scale,
                    (house.width / 4 - 4) * scale,
                    (house.height - 4) * scale
                );
            }
        });
    };

    const setUpCanvas = (canvas: HTMLCanvasElement) => {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
        const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        const interfaceRight = 200;
        const interfaceTop = 20;
        canvas.width = vw - interfaceRight;
        canvas.height = vh - interfaceTop;

        canvas.addEventListener("mousemove", event => {
            moveX = 0;
            moveY = 0;

            const speed = 10;
            const edge = 30;

            if (event.offsetX < edge) {
                moveX = speed;
            }

            if (event.offsetY < edge) {
                moveY = speed;
            }

            if (event.offsetX > (canvas as HTMLCanvasElement).width - edge) {
                moveX = -speed;
            }

            if (event.offsetY > (canvas as HTMLCanvasElement).height - edge) {
                moveY = -speed;
            }
        });

        canvas.addEventListener("mouseleave", event => {
            moveX = 0;
            moveY = 0;
        });

        canvas.addEventListener("mousemove", event => {
            cursorX = event.offsetX;
            cursorY = event.offsetY;
        });

        canvas.onkeypress = (event) => {
            switch (event.key) {
                case "w":
                    scale = Math.min(scale + 0.25, 1.5);
                    break;
                case "s":
                    scale = Math.max(0.5, scale - 0.25);
                    break;
            }
        };
    };

    const getHouseOverlay = (width: number, height: number): Drawable => {
        const tile = getNextCursorAdjacentTile();
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
                    (s * (width - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + offsetY) * scale,
                    (house.width / 4 - 4) * scale,
                    (house.height - 4) * scale
                );
                ctx.globalAlpha = 1.0;
            }
        };
    }


    interface GameState {
        buildMode: boolean
    };

    function Isometric(props: any) {
        const canvasRef = useRef<HTMLCanvasElement>(null);
        let gameState: GameState = { buildMode: false };

        useEffect(() => {
            const canvas = canvasRef.current;
            let lastTime: number | null = null;
            if (canvas) {
                setUpCanvas(canvas);
                let animationFrameId: number;
                const drawBoard = (time: number) => {
                    const timeFactor = lastTime === null ? 0 : (time - lastTime) / 10;
                    lastTime = time;
                    offsetX += timeFactor * moveX / divider / scale;
                    offsetY += timeFactor * moveY / divider / scale;

                    const ctx = canvas.getContext('2d');
                    if (ctx) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        const allDrawables = [...board];
                        if (gameState.buildMode) allDrawables.push(getHouseOverlay(width, height));
                        allDrawables.sort((a, b) => (a.x + a.y) < (b.x + b.y) ? -1 : 1).forEach(d => d.draw(ctx));
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
                    <canvas onMouseUp={() => { if (gameState.buildMode) buildHouse(); }} ref={canvasRef} id="main-canvas" width="1500" height="1000"></canvas>
                    <div className="right"><button onClick={() => { gameState.buildMode = !gameState.buildMode; }}>Build House</button></div>
                </div>
            </Fragment>
        );
    }

    render(<Isometric />, document.body);
};

start();
