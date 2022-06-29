/* exported setup, draw */
let seed = 12345;

const grassColor = "#9ecf05";
const skyColor = "#a5d4eb";
const hillColor = "#1e273f";
const treeColor = "#834324";
const leaveColor = "#fc9beb";
const trainColor = "#ffffff";
const trainBaseColor = "#747988";
const trackColor = "#91abb6";
const trainLineColor = "#1e273f";
const trainWindowColor = "#312e29";

function preload() {
    // runs before setup 
    // use if you want to load any large files and want to make sure they load before setup()
}

function setup() {
  createCanvas(800, 400);
  createButton("reroll").mousePressed(() => seed++);
}

function draw() {
  randomSeed(seed);

  background(100);

  noStroke();

  fill(skyColor);
  rect(0, 0, width, height / 2);

  fill(grassColor);
  rect(0, height / 2, width, height / 2);

  // An example of drawing an irregular polygon
  fill(hillColor);
  beginShape();
  vertex(0, height / 2);
  const steps = 10;
  let prevx = 0;
  let prevy = 0;
  for (let i = 0; i < steps + 1; i++) {
    let x = (width * i) / steps;
    let y = height / 2 - (random() * random() * random() * height) / 2 - height / 10;
    if (y > prevy) {
        vertex(x, y);
    }
    else {
        vertex(prevx, prevy);
        i--;
        prevx = x;
        prevy = y;
    }
   }
  vertex(width, height/2);
  endShape(CLOSE);




  // An example of making something respond to the mouse
  fill(trainColor);
  rect(mouseX + 100, height/2 - 15, 1000, 30);
  beginShape();
  vertex(mouseX + 100, height/2 - 15);
  vertex(mouseX, height/2 - 15 + 20);
  vertex(mouseX, height/2 - 15 + 25);
  vertex(mouseX + 100, height/2 - 15 + 30);
  endShape();

  fill(trainBaseColor);
  rect(mouseX, height/2 - 15 + 20, 1000, 8);

  fill(trackColor);
  rect(0, height / 2 + 10, width, 5);

  fill(trainLineColor);
  rect(0, height / 2 - 3, width, 2);
  rect(0, height / 2, width, 1);

  fill(trainWindowColor);
  for (let i = 20; i < 100000; i+=10) {
    ellipse(mouseX  + 100 + i,height/2 -8,7,7);
  }

  const trees = 5*random();
  for (let i = 0; i < trees; i++) {
    drawLtree();
  }

  const chance = 50;
  for (let i = 0; i < 800; i+= random(0, 100)) {
    for (let j = 220; j < 290; j+= random(0, 50)) {
        var r = 220 + random(-20, 20)
        var g = 120 + random(-20, 20)
        var b = 170 + random(-20, 20)
        fill(r, g, b, 150)
        var point = random(-50, 50)
        ellipse(i + point, j, 10, 10);
        if (point > 0) {
            ellipse(i + point - 50, j, 10, 10);
            ellipse(i, j + random(0, 20), 10, 10);
        }

    }
  }




  // An example of recursively drawing an L-tree 
  function drawLtree() {
    let x = width * random();
    let y = height/2 + height/8 * random();
    let s = width/200 + (y - height/2)/2;
    let jitter = (mouseX - width/2) / width * 2 * Math.PI / 180;
    drawLtreeBranch(x, y, s, (-90 * Math.PI / 180) + jitter, 0, 5); // this angle points north (0 is east)
  }  

  function drawLtreeBranch(x, y, s, angle, max_limit, branch_weight) { // s is length of a segment
    stroke(treeColor);
    strokeWeight(branch_weight);
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);

    let new_s = s * 0.7;
    let new_max = max_limit + random();
    let new_branch_weight = branch_weight - 1;
    new_branch_weight = max(new_branch_weight, 1);

    if (max_limit < 3) {
        if (random() < 1/3) {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else if (random() > 1/3) {
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        } else {
            drawLtreeBranch(x2, y2, new_s, (-35 * Math.PI / 180) + angle, new_max, new_branch_weight);
            drawLtreeBranch(x2, y2, new_s, (35 * Math.PI / 180) + angle, new_max, new_branch_weight);
        }
        drawLtreeBranch(x2, y2, new_s, angle, new_max, new_branch_weight);
    }
    else {
        if (random() < 1/3) {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
        } else if (random() > 1/3) {
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        } else {
            drawLeave(x2, y2, new_s, (-35 * Math.PI / 180) + angle);
            drawLeave(x2, y2, new_s, (35 * Math.PI / 180) + angle);
        }
    }

  }

  function drawLeave(x, y, s, angle) {
    var r = 220 + random(-20, 20)
    var g = 120 + random(-20, 20)
    var b = 170 + random(-20, 20)

    fill(r, g, b, 150);
    noStroke();
    let v = p5.Vector.fromAngle(angle, s);
    let vx = v.x;
    let vy = v.y; 
    let x1 = x;
    let y1 = y; 
    let x2 = x1 + vx;
    let y2 = y1 + vy;
    line(x1, y1, x2, y2);
    circle(x2, y2, 3);
  }
}
