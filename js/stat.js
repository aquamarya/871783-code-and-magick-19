'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var BAR_X = CLOUD_X + GAP;
var BAR_Y = CLOUD_Y + GAP;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
// var barWidth = CLOUD_WIDTH - GAP - BAR_WIDTH - GAP;
var barHeight = CLOUD_HEIGHT - GAP - BAR_GAP * 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomInt = function (int) {
  var randomInt = Math.floor(Math.random() * int) + 1;
  return randomInt;
};

var getPaintBar = function (arr, ctx, i) {
  if (arr[i] === 'Вы') {
    ctx.fillStyle = 'red';
  } else {
    ctx.fillStyle = 'hsl(240, ' + getRandomInt(100) + '%' + ', 50%)';
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  ctx.fillStyle = '#000';

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#1b254c';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', BAR_X, BAR_Y);
  ctx.fillText('Список результатов:', BAR_X, BAR_Y + GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names [i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - BAR_WIDTH + BAR_GAP / 2);
    getPaintBar(names, ctx, i);
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT / 3, (BAR_HEIGHT * times[i]) / maxTime, barHeight);
  }
};
