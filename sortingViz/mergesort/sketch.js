//TODO: clean up


var ARR = [];
var WIN_BUFF_SIZE = .8;      //ratio for canvas buffers

//effective array bounds
var WIDTH = window.innerWidth * WIN_BUFF_SIZE;
var HEIGHT = window.innerHeight * WIN_BUFF_SIZE;
//offsets to even buffer borders
var X_OFFSET = ((1.0-WIN_BUFF_SIZE)/2)* window.innerWidth;
var Y_OFFSET = ((1.0-WIN_BUFF_SIZE)/2)* window.innerHeight;

var STROKE_WEIGHT = WIDTH/HEIGHT; //make sure aspect ratio is maintained

var STATE = 0;
/*
STATE defined as {
  0: show sorted,
  1: shuffling,
  2: sorting, store states
  3: done sorting, show states,
  4: show verifying sort
}
*/

var COUNTDOWN = 100; //keep track of frames to show
var IND_TO_SHUFFLE; var IND_TO_VERIFY;
var ARR_STATES = [];  //keep all steps to array bc can only draw state once
var STATES_IND = 0;

function fisherYates(index) {
  const j = Math.floor(Math.random() * index)
  const temp = ARR[index]
  ARR[index] = ARR[j]
  ARR[j] = temp
}

function deepcopy(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr[i] = arr[i];
  }
  return newArr;
}

function merge(left, mid, right) {
  let secondHalfStart = mid+1;

  if (ARR[mid] < ARR[secondHalfStart]) return;

  while (left <= mid && secondHalfStart <= right) {
    append(ARR_STATES, deepcopy(ARR))
    if (ARR[left] <= ARR[secondHalfStart]) left++;

    else {
      let currVal = ARR[secondHalfStart];
      let currInd = secondHalfStart;

      while (currInd != left) {
        ARR[currInd] = ARR[currInd-1];
        currInd--;
      }

      ARR[left] = currVal;

      left++; mid++; secondHalfStart++;
    }
  }
}

function mergesort(left, right) {
  if (left < right) {
    //not gonna overflow unless screen resolutions get quite big :)
    let mid = Math.floor( (left+right) / 2)

    mergesort(left, mid);
    mergesort(mid+1, right);
    merge(left, mid, right);
  }
}

function setup() {
  createCanvas(WIDTH/WIN_BUFF_SIZE, HEIGHT/WIN_BUFF_SIZE);  //undo window buffer

  //make array based on dimensions
  for (let i = 0; i < min(WIDTH, HEIGHT); i++) {
    ARR[i] = i+1;
  }
  IND_TO_SHUFFLE = ARR.length-1;

  colorMode(HSB);
  strokeWeight(STROKE_WEIGHT);
}

function draw() {
  background(0);

  if (STATE === 3 && STATES_IND < ARR_STATES.length) {
    //display array
    for (let i = 0; i < ARR_STATES[STATES_IND].length; i++) {
      let currVal = ARR_STATES[STATES_IND][i]
      stroke(map(currVal, 1, min(WIDTH, HEIGHT), 0, 360), 100, 100);
      let xPos = (i*STROKE_WEIGHT)+X_OFFSET;
      line(xPos, HEIGHT+Y_OFFSET, xPos, HEIGHT-currVal+Y_OFFSET);
    }
    STATES_IND++;
    if (STATES_IND === ARR_STATES.length) STATE = 4;
    return;
  }
  //display array
  for (let i = 0; i < ARR.length; i++) {
    stroke(map(ARR[i], 1, min(WIDTH, HEIGHT), 0, 360), 100, 100);
    let xPos = (i*STROKE_WEIGHT)+X_OFFSET;
    line(xPos, HEIGHT+Y_OFFSET, xPos, HEIGHT-ARR[i]+Y_OFFSET);
  }
  COUNTDOWN--;
  if (STATE === 0 && COUNTDOWN === 0) {                   //showing clean array
    STATE = 1; COUNTDOWN = 100;
  } else if (STATE === 1) {                               //showing shuffle
    fisherYates(IND_TO_SHUFFLE); IND_TO_SHUFFLE--;
    if (IND_TO_SHUFFLE === 0) STATE = 2;                  //shuffle complete
  } else if (STATE === 2) {                               //show sorting
    mergesort(0, ARR.length-1);
    STATE = 3; IND_TO_VERIFY = 0;
  } else if (STATE === 4 && IND_TO_VERIFY < ARR.length-1) {
    //reuse IND_TO_SHUFFLE as tracker for curr ind to verify sorted
    if (ARR[IND_TO_VERIFY] > ARR[IND_TO_VERIFY+1]) {
      textSize(50);
      textAlign(LEFT, TOP);
      strokeWeight(2);
      fill(255, 0, 0);
      text("FAILED", 0, 0);
      noLoop();
    }
    let xPos = (IND_TO_VERIFY*STROKE_WEIGHT)+X_OFFSET;
    line(xPos, HEIGHT+Y_OFFSET, xPos, HEIGHT-ARR[IND_TO_VERIFY]+Y_OFFSET);
    IND_TO_VERIFY++;
  } else if (IND_TO_VERIFY === ARR.length-1) {
    textSize(50);
    textAlign(LEFT, TOP);
    strokeWeight(2);
    fill(255, 0, 0);
    text("SUCCESS", 0, 0);
    noLoop();
  }
}
