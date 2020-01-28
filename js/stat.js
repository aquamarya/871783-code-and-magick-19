'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 20;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var HISTOGRAM_HEIGHT = 150;
var TEXT_COLOR = '#1b254c';
var TEXT_FONT = '16px PT Mono';
var MY_COLOR = 'rgba(255, 0, 0, 1)';
var CLOUD_COLOR = '#fff';
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var BASELINE_TYPE = 'hanging';
var barHeight = CLOUD_Y + GAP * 2 + GAP / 2;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderHistogram = function (ctx, names, times) {
  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_HEIGHT - GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + GAP) + barHeight + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime - GAP);
    ctx.fillStyle = names[i] === 'Вы' ? MY_COLOR : 'hsl(240, ' + Math.floor(Math.random() * 100) + '%,  50%)';
    ctx.fillRect(CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, (CLOUD_Y + GAP) + barHeight + HISTOGRAM_HEIGHT - (HISTOGRAM_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (HISTOGRAM_HEIGHT * times[i]) / maxTime);
  }
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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;
  ctx.textBaseline = BASELINE_TYPE;

  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + GAP + GAP);

  renderHistogram(ctx, names, times);
};
