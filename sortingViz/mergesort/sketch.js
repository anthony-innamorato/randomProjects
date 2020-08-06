var ARR = [];
var WIDTH = 1400; var HEIGHT = 700;
var STROKEWEIGHT;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  //make array based on dimensions
  for (let i = 0; i < min(WIDTH, HEIGHT); i++) {
    ARR[i] = i+1;
  }
  stroke(0, 255, 0);
  STROKEWEIGHT = WIDTH/HEIGHT;
  strokeWeight(STROKEWEIGHT);
}

function draw() {
  background(0);
  for (let i = 0; i < ARR.length; i++) {
    line(i*STROKEWEIGHT, HEIGHT, i*STROKEWEIGHT, HEIGHT-ARR[i]);
  }
  ARR = shuffle(ARR);
  //enum show clean array
  //enum show shuffling
  //enum show sorting
  //enum show sorted
}
