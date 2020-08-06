var ARR = [];
var WIDTH = 1200; var HEIGHT = 700;

function setup() {
  createCanvas(WIDTH, HEIGHT);
  //make array based on dimensions
  for (let i = 0; i < min(WIDTH, HEIGHT); i++) {
    ARR[i] = i+1;
  }
  stroke(0, 255, 0);
}

function draw() {
  background(0);
  for (let i = 0; i < ARR.length; i++) {
    line(i, HEIGHT, i, HEIGHT-ARR[i]);
  }
  //enum show clean array
  //enum show shuffling
  //enum show sorting
  //enum show sorted
}
