const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const generateBoard = async (height: number, width: number) => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const scale = 1.0;
    const defaultHeight = images[0].height;
    const canvas = document.getElementById('main-canvas');
    if (canvas) {
        const ctx = (canvas as HTMLCanvasElement).getContext('2d');
        if (ctx) {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    const choose = getRandomInt(images.length)
                    const direction = getRandomInt(4)
                    const img = images[choose];
                    const s = (img.width / 8) - 4;
                    ctx.drawImage(
                        img,
                        2 + (img.width / 4) * direction,
                        2,
                        img.width / 4 - 4,
                        img.height - 4,
                        s * (width - x + y), (x + y) * (s / 2) + (defaultHeight - img.height),
                        (img.width / 4 - 4) * scale,
                        (img.height - 4) * scale
                    );

                }
            }
        }
    }
};

generateBoard(7, 3);