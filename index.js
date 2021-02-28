(() => {
  // index.ts
  var loadImage = (url) => {
    return new Promise((r) => {
      let i = new Image();
      i.onload = () => r(i);
      i.src = url;
    });
  };
  var getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };
  var scale = 1;
  var offsetX = 0;
  var offsetY = 0;
  var divider = window.navigator.platform.toLowerCase().indexOf("mac") === -1 ? window.devicePixelRatio : 1;
  var canvas = document.getElementById("main-canvas");
  if (canvas) {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    canvas.width = vw;
    canvas.height = vh;
  }
  var cursorX = 0;
  var cursorY = 0;
  var moveX = 0;
  var moveY = 0;
  var start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const house = await loadImage("./house.png");
    const s = house.width / 8 - 4;
    const defaultHeight = images[0].height;
    const getNextCursorAdjacentTile = () => {
      let ox = (-width * s - offsetX - s) / 2;
      let oy = (s + offsetY) / 2;
      let x = Math.floor((cursorY / (2 * scale) - oy) / (s / 2) + (-cursorX / (scale * 2) - ox) / s);
      let y = Math.floor((cursorY / (2 * scale) - oy) / (s / 2) - (-cursorX / (scale * 2) - ox) / s);
      x = Math.min(width - 1, Math.max(0, x));
      y = Math.min(height - 1, Math.max(0, y));
      return board.filter((d) => d.x === x && d.y === y)[0];
    };
    const buildHouse = () => {
      const tile = getNextCursorAdjacentTile();
      const x = tile.x;
      const y = tile.y;
      board.splice(board.indexOf(tile), 1);
      board = board.filter((d) => d.x !== x || d.y !== y);
      board.push({
        x,
        y,
        z: 0,
        draw: (ctx) => {
          ctx.drawImage(house, 2 + house.width / 4 * 3, 2, house.width / 4 - 4, house.height - 4, (s * (width - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + offsetY) * scale, (house.width / 4 - 4) * scale, (house.height - 4) * scale);
        }
      });
    };
    document.onmouseup = () => {
      buildHouse();
    };
    document.onmousemove = (event) => {
      moveX = 0;
      moveY = 0;
      const speed = 10;
      const edge = 30;
      if (canvas) {
        if (event.clientX < edge) {
          moveX = speed;
        }
        if (event.clientY < edge) {
          console.log("hi");
          moveY = speed;
        }
        if (event.clientX > canvas.width - edge) {
          moveX = -speed;
        }
        if (event.clientY > canvas.height - edge) {
          moveY = -speed;
        }
      }
      cursorX = event.offsetX;
      cursorY = event.offsetY;
    };
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
    const generateBoard = (height2, width2) => {
      const result = [];
      for (let x = 0; x < width2; x++) {
        for (let y = 0; y < height2; y++) {
          const choose = getRandomInt(images.length);
          const direction = getRandomInt(4);
          const img = images[choose];
          result.push({
            x,
            y,
            z: 0,
            draw: (ctx) => {
              const s2 = img.width / 8 - 4;
              ctx.drawImage(img, 2 + img.width / 4 * direction, 2, img.width / 4 - 4, img.height - 4, (s2 * (width2 - x + y) + offsetX) * scale, ((x + y) * (s2 / 2) + (defaultHeight - img.height) + offsetY) * scale, (img.width / 4 - 4) * scale, (img.height - 4) * scale);
            }
          });
        }
      }
      return result;
    };
    const getHouseOverlay = (width2, height2) => {
      const tile = getNextCursorAdjacentTile();
      const x = tile.x;
      const y = tile.y;
      return {
        x,
        y,
        z: 0,
        draw: (ctx) => {
          ctx.globalAlpha = 0.85;
          ctx.drawImage(house, 2 + house.width / 4 * 3, 2, house.width / 4 - 4, house.height - 4, (s * (width2 - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - house.height) + offsetY) * scale, (house.width / 4 - 4) * scale, (house.height - 4) * scale);
          ctx.globalAlpha = 1;
        }
      };
    };
    const width = 12;
    const height = 12;
    let board = await generateBoard(height, width);
    const drawBoard = () => {
      offsetX += moveX / divider / scale;
      offsetY += moveY / divider / scale;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          [...board, getHouseOverlay(width, height)].sort((a, b) => a.x + a.y < b.x + b.y ? -1 : 1).forEach((d) => d.draw(ctx));
        }
      }
      requestAnimationFrame(drawBoard);
    };
    drawBoard();
  };
  start();
})();
//# sourceMappingURL=index.js.map
