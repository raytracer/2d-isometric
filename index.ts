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
const canvas = document.getElementById('main-canvas');

if (canvas) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const interfaceRight = 200;
    const interfaceTop = 20;
    (canvas as HTMLCanvasElement).width = vw - interfaceRight;
    (canvas as HTMLCanvasElement).height = vh - interfaceTop;
}

let cursorX = 0;
let cursorY = 0;

let moveX = 0;
let moveY = 0;

const start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const house = await loadImage("./house.png");
    const s = (house.width / 8) - 4;
    const defaultHeight = images[0].height;

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


    if (canvas) {
        canvas.onmouseup = () => {
            buildHouse();
        };

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
    }

    document.addEventListener("mousemove", event => {
        cursorX = event.offsetX;
        cursorY = event.offsetY;
    });

    document.onkeypress = (event) => {
        switch (event.key) {
            case "w":
                scale = Math.min(scale + 0.25, 1.5);
                break;
            case "s":
                scale = Math.max(0.5, scale - 0.25);
                break;
        }
    };

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

    const width = 12;
    const height = 12;
    let board = await generateBoard(height, width);

    const drawBoard = () => {
        offsetX += moveX / divider / scale;
        offsetY += moveY / divider / scale;

        if (canvas) {
            const ctx = (canvas as HTMLCanvasElement).getContext('2d');
            if (ctx) {
                ctx.clearRect(0, 0, (canvas as HTMLCanvasElement).width, (canvas as HTMLCanvasElement).height);
                [...board, getHouseOverlay(width, height)].sort((a, b) => (a.x + a.y) < (b.x + b.y) ? -1 : 1).forEach(d => d.draw(ctx));
            }
        }

        requestAnimationFrame(drawBoard);
    };

    drawBoard();
};

start();