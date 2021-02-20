(() => {
  // index.ts
  var loadImage = (url) => {
    return new Promise((r) => {
      let i = new Image();
      i.onload = () => r(i);
      i.src = url;
    });
  };
  var generateBoard = async (height, width) => {
    let img = await loadImage("./grass.png");
    const scale = 1;
    const s = img.width / 8 - 2;
    const canvas = document.getElementById("main-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        for (let x = 0; x < width; x++) {
          for (let y = 0; y < height; y++) {
            ctx.drawImage(img, 2 + img.width / 4, 2, img.width / 4 - 4, img.height - 4, s * (width - x + y), (x + y) * (s / 2), (img.width / 4 - 4) * scale, (img.height - 4) * scale);
          }
        }
      }
    }
  };
  generateBoard(7, 3);
})();
//# sourceMappingURL=index.js.map
