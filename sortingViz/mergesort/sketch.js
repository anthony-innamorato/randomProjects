var ARR = [];
var WIDTH = 1400; var HEIGHT = 700;
var STROKE_WEIGHT;
var STATE = 0;
/*
STATE defined as {
  0: show sorted,
  1: shuffling,
}
*/
var COUNTDOWN = 100; //keep track of frames to show
var IND_TO_SHUFFLE;

function myShuffle(index) {
  const j = Math.floor(Math.random() * index)
  const temp = ARR[index]
  ARR[index] = ARR[j]
  ARR[j] = temp
}

function setup() {
  createCanvas(WIDTH, HEIGHT);

  //make array based on dimensions
  for (let i = 0; i < min(WIDTH, HEIGHT); i++) {
    ARR[i] = i+1;
  }
  IND_TO_SHUFFLE = ARR.length-1;

  stroke(0, 255, 0);
  STROKE_WEIGHT = WIDTH/HEIGHT;
  strokeWeight(STROKE_WEIGHT);
}

function draw() {
  background(0);
  for (let i = 0; i < ARR.length; i++) {
    line(i*STROKE_WEIGHT, HEIGHT, i*STROKE_WEIGHT, HEIGHT-ARR[i]);
  }
  COUNTDOWN--;
  if (STATE === 0 && COUNTDOWN === 0) {
    STATE = 1; COUNTDOWN = 100;
  } else if (STATE === 1) {
    myShuffle(IND_TO_SHUFFLE); IND_TO_SHUFFLE--;
    if (IND_TO_SHUFFLE === 0) {
      STATE = 2;
    }
  }
  //enum show clean array
  //enum show shuffling
  //enum show sorting
  //enum show sorted
}
