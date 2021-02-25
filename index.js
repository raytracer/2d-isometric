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
  var pressed = false;
  document.onmousedown = () => pressed = true;
  document.onmouseup = () => pressed = false;
  document.onmousemove = (event) => {
    if (pressed) {
      offsetX += event.movementX / window.devicePixelRatio / scale;
      offsetY += event.movementY / window.devicePixelRatio / scale;
    }
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
  var start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const defaultHeight = images[0].height;
    const generateBoard = async (height2, width2) => {
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
              const s = img.width / 8 - 4;
              ctx.drawImage(img, 2 + img.width / 4 * direction, 2, img.width / 4 - 4, img.height - 4, (s * (width2 - x + y) + offsetX) * scale, ((x + y) * (s / 2) + (defaultHeight - img.height) + offsetY) * scale, (img.width / 4 - 4) * scale, (img.height - 4) * scale);
            }
          });
        }
      }
      return result;
    };
    const width = 12;
    const height = 12;
    const board = await generateBoard(height, width);
    const drawBoard = () => {
      const canvas = document.getElementById("main-canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          board.forEach((d) => d.draw(ctx));
        }
      }
      requestAnimationFrame(drawBoard);
    };
    drawBoard();
  };
  start();
})();
//# sourceMappingURL=index.js.map
