var STEG;
var DROPS = [];
var CANVAS_SIZE = [1920, 1080];
var MAX_WIDTH = 12;

class Number {
  constructor(x, y, currNum) {
    this.x = x; this.y = y; this.currNum = currNum;
  }
}

class Drop {
  constructor(x, y, len, width) {
    this.x = x; this.y = y; this.len = len;
    this.width = width; this.fallRate = random(0.0001, 0.2);

    //if the drops MAX_WIDTH/3 thin then dont create any nums for it
    if (this.width < MAX_WIDTH/3) return;


    //base the rate the nums change off the speed of the drop
    this.numRateChange = floor(map(this.fallRate, 0.0001, 0.2, 1, 10));

    this.numArr = []; let ind = 0;
    for (let i = 0; i < CANVAS_SIZE[1]; i += this.width*2) {
      this.numArr[ind] = new Number(this.x, (this.width*ind*2), int(random(10)));
      ind++;
    }

    //text size based off the width of the drop
    this.textSize = map(this.width, MAX_WIDTH/3, MAX_WIDTH, MAX_WIDTH/2, MAX_WIDTH*1.8);
  }

  update() {
    this.len += this.fallRate;
    //if rect goes past screen, reset to top (will be transparent
      //enough where it doesnt look jarring
    if (this.len > CANVAS_SIZE[1]) {
      this.len = 0;
    }

    //only update num to be drawn every this.numRateChange frames
    if (frameCount % this.numRateChange != 0) return;
    for (let i = 0; i < this.numArr.length; i++) {
      this.numArr[i].currNum = int(random(10));
    }
  }

  show() {
    //alpha of rect should be relative to len of canvas
    let alpha = map(this.len, 0, CANVAS_SIZE[1], 255, 0);
    fill(0, 0, 0, alpha);
    rect(this.x, this.y, this.width, this.len);

    //make nums neon green but more transparent than their drop
    fill(57, 255, 20, alpha*.5);

    //if too thin then dont show the nums (same logic as constructor)
    if (this.width < MAX_WIDTH/3) return;
    textSize(this.textSize);

    for (let i = 0; i < this.numArr.length; i++) {
      let obj = this.numArr[i];

      //only display nums that are within bounds of drop
      if (obj.y > this.len) {
        return;
      }
      text(str(obj.currNum), obj.x, obj.y);
    }
  }
}

function setup() {
  STEG = loadImage("background.svg");
  textFont("Consolas");

  //create blocks, set x/y, rand len/width
  let i = 0; let ind = 0;
  while (i < CANVAS_SIZE[0]) {
    let randWidth = random(MAX_WIDTH);
    DROPS[ind] = new Drop(i, 0, random(CANVAS_SIZE[1]), randWidth);
    i += (randWidth + 5); ind += 1;
  }

  noStroke();
  frameRate(60);

  createCanvas(CANVAS_SIZE[0], CANVAS_SIZE[1]);
}

function draw() {
  background(STEG);
  for (let i = 0; i < DROPS.length; i++) {
    DROPS[i].update()
  }
  for (let i = 0; i < DROPS.length; i++) {
    DROPS[i].show()
  }
}
