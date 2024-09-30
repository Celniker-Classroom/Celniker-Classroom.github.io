let speed = 0
let pressed = 0

function setup() {
	new Canvas(700, 850);
	world.gravity.y = 10;
	noStroke();

	//Prize Bin
	bin = new Sprite();
	bin.h = 300;
	bin.w = 200;
	bin.x = 150;
	bin.y = 700;
	bin.color = '#f7abf5';
	bin.layer = 2;
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
	while (dots.length < 26) {
		let dot = new dots.Sprite();
		dot.x = dots.length * 5+200;
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
	claw.h = 10;
	claw.w = 10;
	claw.x = 150;
	claw.y = 300;
	claw.direction = 0; 
	//claw.image = 'Images/Claw.png'      
	claw.collider = 'k'; 
}

function draw() {
	background('#d17bed');

	//roof
	fill('#ab74e3');
	rect(0,0,710,100);

	//roof boarder
	for (var i = 10; i < 900; i += 100) {
		fill('#ab74e3');
		ellipse(i,120,150,150);
	}

	arm.speed = speed;
	claw.speed = speed;
	if(kb.pressed(' ')){ 
		speed = 2;
		arm.y = 220;
		arm.h = 100;
		claw.y = 300;
		claw.h = 10;
	}

	//if(arm.x = 600){
		//speed = 0;
	//}


	arm.speed = speed;
	if (kb.pressing(' ')){
		speed = 0;
		arm.h = 450;
		arm.y = 300;
	}

	claw.speed = speed;
	if(kb.pressing('')){
		speed = 0;
		claw.y = 400;
	}

	stroke('black');
	text('PRIZE VALUE:', 220,250);
	textSize(50);
	text('Red = Common', 220, 290);
	textSize(50);
	text('Pink = Uncommon', 220, 330);
	textSize(50);
	text('Blue = Rare', 220, 370);
	textSize(50);
	text('Purple = Epic', 220, 410);
	textSize(50);
	noStroke();
	
	if (claw.x = 151){
		stroke('black');
		text('PRIZE VALUE:', 1090,250);
		textSize(50);
		text('Red = Common', 1090, 290);
		textSize(50);
		text('Pink = Uncommon', 1090, 330);
		textSize(50);
		text('Blue = Rare', 1090, 370);
		textSize(50);
		text('Purple = Epic', 1090, 410);
		textSize(50);
		noStroke();
	}
}
