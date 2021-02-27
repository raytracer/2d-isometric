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
let pressed = false;
const divider = window.navigator.platform.toLowerCase().indexOf("mac") === -1 ? window.devicePixelRatio : 1;

let cursorX = 0;
let cursorY = 0;

document.onmousedown = () => pressed = true;
document.onmouseup = () => pressed = false;
document.onmousemove = (event) => {
    if (pressed) {
        offsetX += event.movementX / divider / scale;
        offsetY += event.movementY / divider / scale;
    };

    cursorX = event.offsetX;
    cursorY = event.offsetY;
}

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

const start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const house = await loadImage("./house.png");
    const defaultHeight = images[0].height;

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
        const s = (house.width / 8) - 4;
        let ox = (-width * s - offsetX - s) / 2;
        let oy = (s + offsetY) / 2;
        let x = Math.floor(((cursorY / (2 * scale) - oy) / (s / 2)) + ((-cursorX / (scale * 2) - ox) / s));
        let y = Math.floor(((cursorY / (2 * scale) - oy) / (s / 2)) - ((-cursorX / (scale * 2) - ox) / s));

        x = Math.min(width - 1, Math.max(0, x));
        y = Math.min(height - 1, Math.max(0, y));

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
    const board = await generateBoard(height, width);

    const drawBoard = () => {
        const canvas = document.getElementById('main-canvas');

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