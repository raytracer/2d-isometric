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
        console.log("i was here");
        scale += 0.05;
        break;
      case "s":
        scale -= 0.05;
        break;
    }
  };
  var start = async () => {
    const images = [await loadImage("./grass.png"), await loadImage("./flowers.png"), await loadImage("./dirt.png")];
    const generateBoard = async (height2, width2) => {
      const result = [];
      for (let x = 0; x < width2; x++) {
        for (let y = 0; y < height2; y++) {
          const choose = getRandomInt(images.length);
          const direction = getRandomInt(4);
          const img = images[choose];
          result.push({x, y, img, direction});
        }
      }
      return result;
    };
    const width = 3;
    const height = 7;
    const board = await generateBoard(height, width);
    const drawBoard = () => {
      const defaultHeight = images[0].height;
      const canvas = document.getElementById("main-canvas");
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          board.forEach((d) => {
            const s = d.img.width / 8 - 4;
            ctx.drawImage(d.img, 2 + d.img.width / 4 * d.direction, 2, d.img.width / 4 - 4, d.img.height - 4, (s * (width - d.x + d.y) + offsetX) * scale, ((d.x + d.y) * (s / 2) + (defaultHeight - d.img.height) + offsetY) * scale, (d.img.width / 4 - 4) * scale, (d.img.height - 4) * scale);
          });
        }
      }
      requestAnimationFrame(drawBoard);
    };
    drawBoard();
  };
  start();
})();
//# sourceMappingURL=index.js.map
