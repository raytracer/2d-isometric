export const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
}

export const getRandomInt = (max: number) => {
    return Math.floor(Math.random() * Math.floor(max));
}
