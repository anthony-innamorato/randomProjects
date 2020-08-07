//TODO: clean up, add color gradients


var ARR = [];
var WIDTH = 2450; var HEIGHT = 1250;
var STROKE_WEIGHT;
var STATE = 0;
/*
STATE defined as {
  0: show sorted,
  1: shuffling,
  2: sorting, store states
  3: done sorting, show states
}
*/
var COUNTDOWN = 100; //keep track of frames to show
var IND_TO_SHUFFLE;
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
        //append(ARR_STATES, deepcopy(ARR))
        ARR[currInd] = ARR[currInd-1];
        currInd--;
      }

      //append(ARR_STATES, deepcopy(ARR))
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

  if (STATE === 3 && STATES_IND < ARR_STATES.length) {
    //display array
    for (let i = 0; i < ARR_STATES[STATES_IND].length; i++) {
      line(i*STROKE_WEIGHT, HEIGHT, i*STROKE_WEIGHT, HEIGHT-ARR_STATES[STATES_IND][i]);
    }
    STATES_IND++;
    return;
  }
  //display array
  for (let i = 0; i < ARR.length; i++) {
    line(i*STROKE_WEIGHT, HEIGHT, i*STROKE_WEIGHT, HEIGHT-ARR[i]);
  }
  COUNTDOWN--;
  if (STATE === 0 && COUNTDOWN === 0) {                   //showing clean array
    STATE = 1; COUNTDOWN = 100;
  } else if (STATE === 1) {                               //showing shuffle
    fisherYates(IND_TO_SHUFFLE); IND_TO_SHUFFLE--;
    if (IND_TO_SHUFFLE === 0) {                           //shuffle complete
      STATE = 2;
    }
  } else if (STATE === 2) {                               //show sorting
    mergesort(0, ARR.length-1);
    STATE = 3;
  }
}
