
let workerButton, shopButton, bankButton, stockCrash;
let costW, costS, costB, costM;
let score = 0, csize = 150, inc = 0, adder=0;
function setup() {
  createCanvas();
  noLoop();
  setInterval(inC, 20);
  //draws the upgrades and the cost of them
  workerButton= new Sprite();
  workerButton.diameter = 120
  workerButton.x = 1700
  workerButton.y = 200
  workerButton.img = 'Images/New Piskel (10).png';
  shopButton= new Sprite();
  shopButton.diameter = 120
  shopButton.x = 1700
  shopButton.y = 400
  shopButton.img = 'Images/New Piskel (11).png';
  bankButton= new Sprite();
  bankButton.diameter = 120
  bankButton.x= 1700
  bankButton.y = 600
  bankButton.img = 'Images/New Piskel (12).png';
  stockCrash= new Sprite();
  stockCrash.diameter = 120
  stockCrash.x= 1700
  stockCrash.y = 800
  stockCrash.img = 'Images/New Piskel (13).png';
  costW = new Sprite();
  costW.x = 1700
  costW.y =290
  costW.img = 'Images/New Piskel (15).png';
  costS = new Sprite();
  costS.x = 1700
  costS.y =490
  costS.img = 'Images/New Piskel (19).png';
  costB = new Sprite();
  costB.x = 1700
  costB.y =690
  costB.img = 'Images/New Piskel (20).png';
  costM = new Sprite();
  costM.x = 1700
  costM.y =900
  costM.img = 'Images/New Piskel (21).png';
}


function draw() {
  
  background(51);
  text ("Press on the coin for cash and buy upgrades to gain more cash", 1000, 80);
  push()
  strokeWeight(10);
  stroke(200, 150, 10)
  fill(255, 200, 50);
  //displays words on the coin
  if (csize / 2 > dist(width / 2, height / 2, mouseX, mouseY)) {
    fill(240, 180, 40);
    inc = 1;
  }
  ellipse(width / 2, height / 2, csize, csize);
  pop();
  textSize(60);
  textAlign(CENTER);
  text(score, width / 2, height / 2 + 20);
  //tracks the amount of money you need to buy stuff
  if (workerButton.mouse.pressing() && score>=100){ 
    score-=100
    adder++
    
  }

  if (shopButton.mouse.pressing() && score>=500){ 
    score-=500
    adder+=5
    
  }
  if (bankButton.mouse.pressing() && score>=2000){ 
    score-=2000
    adder+=15
    
  }
  if (stockCrash.mouse.pressing() && score>=5000){
    score-=5000
    adder+=50
    
  }
  score += adder
  if(score>=10000){
    allSprites.removeAll();
  }
}
//writes the words on the coin
function inC() {
  if (csize / 2 > dist(width / 2, height / 2, mouseX, mouseY)) {
    inc = 1;
  } else if (inc === 1) {
    inc = 0;
    redraw()
  }


}

//detects if the mouse has been pressed
function mousePressed() {
  if (csize / 2 > dist(width / 2, height / 2, mouseX, mouseY))
    score++;
  redraw();
}
