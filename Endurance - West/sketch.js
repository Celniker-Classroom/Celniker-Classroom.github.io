//declare variables
let weightHolder;
let weightValue = 10;
let support;
let weights;
let bgimg;
let started = 0;
//load images
function preload(){
	bgimg = loadImage('Images/bg.png');
}
//setup
function setup() {
	new Canvas();
	world.gravity.y = 0;
	//initialize sprites
	weightHolder = new Sprite(screen.width/2, 100, 100, 125, 'd');
	weightHolder.image = 'Images/Gym Assets-2.png.png';
	support = new Sprite(screen.width/2, screen.height, screen.height/2.4380952381, screen.height, 'none');
	support.image = 'Images/Gym Assets-3.png.png'
	support.image.offset.y = -(screen.height/4.25);
	support.layer = -1;
	support.image.scale = (screen.height/2.4380952381)/210;
	weightHolder.image.scale = support.image.scale;
	weightHolder.pixelPerfect = true;
	support.pixelPerfect = true;
	weights = new Group();
	frameRate(60);
}
//main loop
function draw() {
	background(bgimg);

	if (started == 0){
		//instructions before the game starts
		fill(255);
		textSize(30);
		text("Welcome to Endurance! Press space as fast as you can to lift the weight!", screen.width/2-10, 30);
		if (kb.pressed(' ')) {
			started = 1;
			world.gravity.y = 1;
		}
	}else if (started == 1){
		//main game
		if (kb.pressed(' ')) {
			weightHolder.velocity.y -= 10;	
		}
		weightHolder.gravityScale = weightValue;
		textSize(50);
		text(weightValue + 'kg', 0, 50);
		//handle fail
		if(weightHolder.y >= screen.height-50){
			weightHolder.gravityScale = 0;
			weightHolder.velocity.y = 0;
			started = 2;
		}else if(frameCount%200 == 0){
			//increment counter and add weights
			weightValue += 10
			weight = new weights.Sprite(screen.width/2, weightHolder.y-((weightValue/10)*32), weightHolder.width, weightHolder.height-30, 'none');
			weight.image = 'Images/Gym Assets-1.png.png';
			weight.image.scale = 2;
			weight.image.offset.y = -30;
		}else{
			text('Next weight in ' + Math.round((200-frameCount%200)/60*10)/10, 0, 150);
		}
		//top collision
		if(weightHolder.y <= 120){
			weightHolder.y = 120;
			weightHolder.velocity.y = 0;
		}
		weights.moveTowards(weightHolder, 1);
	}else{
		//post-failure text
		textSize(30);
		text("You lifted " + weightValue + " kilograms! Press F5 to try again. How much can you lift?", screen.width/2-10, 30);
		weightHolder.collider = 's';
		if (kb.pressed(' ')) {
			started = 1;
			world.gravity.y = 1;
		}
	}
}