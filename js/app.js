import settings from "./settings.js";

const canvas1 = document.getElementById("canvas1");
const ctx = canvas1.getContext("2d");
let canvas2 = document.getElementById("canvas2");
let ctx2 = canvas2.getContext("2d");

function drawStar({ cx, cy, spikes, outerRadius, innerRadius, color }) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  let step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;
    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();

  ctx.fillStyle = color;
  ctx.fill();
}

function fillCanvas2(chengeColor) {
  ctx2.rect(0, 0, 600, 50);
  ctx2.fillStyle =
    chengeColor !== "rgba(0, 0, 0,0)" ? chengeColor : settings.defaultBgCanvas2;
  ctx2.fill();
}

drawStar(settings.optionsStar1);
drawStar(settings.optionsStar2);
drawStar(settings.optionsStar3);
drawStar(settings.optionsStar4);
drawStar(settings.optionsStar5);
fillCanvas2(settings.defaultBgCanvas2);

canvas1.onmousemove = function (event) {
  canvas1.onmousedown = function (event) {
    var x = event.offsetX;
    var y = event.offsetY;
    const rgba = ctx.getImageData(x, y, 1, 1).data;
    const nameChangeColor = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]},${rgba[3]})`;
    fillCanvas2(nameChangeColor);
  };
};
