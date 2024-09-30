let speed = 0
let pressed = 0
let ifgrab = 0
let glitch = 0
let ballx = 0
let ifball = 0

function setup() {
    new Canvas(700, 850);
    world.gravity.y = 10;
    world.gravity.x = 0.5; 
    noStroke();


    //Prize Bin
    bin = new Sprite();
    bin.h = 300;
    bin.w = 10;
    bin.x = 250;  
    bin.y = 700;
    bin.color = '#f7abf5';
    bin.layer = 5;
    bin.collider = 'static'
    //bin.overlaps(dots);


    //The boarder of the claw machine
    rightWall = new Sprite();
    rightWall.h = 700;
    rightWall.w = 30;
    rightWall.x = 650;
    rightWall.y = 500;
    rightWall.collider = 'static';
    rightWall.color = '#ab74e3';


    leftWall = new Sprite();
    leftWall.h = 700;
    leftWall.w = 30;
    leftWall.x = 50;
    leftWall.y = 500;
    leftWall.collider = 'static';
    leftWall.color = '#ab74e3';


    bottomWall = new Sprite();
    bottomWall.h = 100;
    bottomWall.w = 750;
    bottomWall.y = 850;
    bottomWall.collider = 'static';
    bottomWall.color = '#ab74e3';

    //prizes
    dots = new Group();
    dots.d = 50;
    dots.y = 600;
    dots.diameter = 10;
    dots.layer = 2;
    while (dots.length < 37) {
        let dot = new dots.Sprite();
        dot.x = dots.length * 5+300;
        dot.color = random(['#fc7c7c', 'pink', '#7ce1fc', '#904ebf']);
    }

    //Claw
    arm = new Sprite();
    arm.w = 25;
    arm.h = 100;
    arm.x = 150;
    arm.y = 220;
    arm.direction = 0;
    arm.color = '#ab74e3';
    arm.collider = 'k';
    claw = new Sprite();
    claw.h = 70
    claw.x = 200;
    claw.y = 300;
    claw.direction = 0;
    claw.image = 'Images/Claw.png'      
    claw.collider = 'k';
}


function draw() {
    background('#d17bed');
 
    //Title
    stroke('black');
    fill('pink');
    textSize(40);
    text('Cutesy Claw Machine!', 220, 230);
    fill('#d17bed');
    noStroke();

    //Directions
    stroke('black');
    fill('pink');
    textSize(25);
    text('Press Space to start, get 3', 220, 480);
    text('epics to win and do not overflow...', 220, 510);
    fill('#d17bed');
    noStroke();
    if(kb.pressed){
        alltext = (1000,1000);
    }

    //prize bin
    fill('#f7abf5');
    rect(60,550,190,800);

    //roof
    fill('#ab74e3');
    rect(0,0,710,100);

    //roof boarder
    for (var i = 10; i < 900; i += 100) {
        fill('#ab74e3');
        ellipse(i,120,150,150);
    }

    //Claw movement to the right
	claw.x = arm.x;
    arm.speed = speed;
    claw.speed = speed;
    if(kb.pressed(' ')){
        speed = 5;
        arm.y = 220;   
        arm.h = 100;
        claw.y = 300;
        claw.h = 10;
    }

    //Claw picks up a prize
	if(claw.collides(dots)){
        claw.image =  random(['Images/REDD.png', 'Images/PINKK.png','Images/BLUEEE.png', 'Images/PURPLEE.png']);
        ifgrab = 1;
    }
 
    //Claw goes back to the left
    if(arm.x >= 550){
        speed = 5;
        claw.direction = 180;
        arm.direction = 180;
    }

    //Claw drops the prize
    if(arm.x <= 149){
        speed = 0; 
        claw.direction = 0;
        arm.direction = 0;
        if(ifgrab == 1){
            ball = new Sprite();
            ball.d = 50;
            ball.x = 150;
            ball.y = 350;
            ball.layer = 3;
            ball.color = random(['#fc7c7c', '#fc7c7c', '#fc7c7c', '#fc7c7c', 'pink', 'pink', 'pink', '#7ce1fc', '#7ce1fc', '#904ebf']);
            ifball = 1
        }
      //if(claw.image == 'Images/REDD.png'){
         //claw.image = 'Images/Claw.png'
          // dot.color = '#fc7c7c'
        //}
        //else if(claw.image == 'Images/PINKK.png'){
            //claw.image = 'Images/Claw.png'
            //dot.color = 'pink'
        //}
        //else if(claw.image == 'Images/BLUEE.png'){
            //claw.image = 'Images/Claw.png'
            //dot.color = '#7ce1fc'
        //}
       // else if(claw.image == 'Images/PURPLEE.png'){ 
            //claw.image = 'Images/Claw.png'
           // dot.color = '#904ebf'
       // }
        claw.image = 'Images/Claw.png' ;
        ifgrab = 0;
    }

    if(ifball == 1){
        ballx = ball.x
    }

   if(ballx > 250 && ifball == 1){
       glitch = 1
    }

    if(glitch == 1 && ifball == 1){
       ball = new Sprite();
        ball.d = 50;
        ball.x = 150;
        ball.y = 350;
        ball.layer = 3;
        ball.color = random(['#fc7c7c', 'pink', '#7ce1fc', '#904ebf']);
    }

    //Claw arm goes down for the prize
    if (kb.pressing(' ')){
        speed = 0;
        arm.h = 500;
        arm.y = 350;
		claw.y = 600;
    }

    // move the claw down to the prizes
    claw.speed = speed;
    if(kb.pressing('')){
        speed = 0;
        claw.y = 400;
    }

    //Prize value text
    stroke('black');
    text('PRIZE VALUE:', 220,280);
    textSize(50);
    text('Red = Common', 220, 320);
    textSize(50);
    text('Pink = Uncommon', 220, 360);
    textSize(50);
    text('Blue = Rare', 220, 400);
    textSize(50);
    text('Purple = Epic', 220, 440);
    textSize(50);
    noStroke();
   
    //Claw movement
    if (claw.x == 151){
        stroke('black');
        text('PRIZE VALUE:', 1090,1250); 
        textSize(50);
        text('Red = Common', 1090, 1290);
        textSize(50);
        text('Pink = Uncommon', 1090, 1330);
        textSize(50);
        text('Blue = Rare', 1090, 1370);
        textSize(50);
        text('Purple = Epic', 1090, 1410);
        textSize(50);
        noStroke();
    }
}