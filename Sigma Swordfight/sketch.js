let sigma;
let skibidi;
let sigmaImage;
let sigmaLeft;
let sigmaRight;
let sigmaLeftImage;
let sigmaRightImage;
let skibidiImage;
let skibidiLeft;
let skibidiRight;
let skibidiLeftImage;
let skibidiRightImage;
let time = 0;
let trigger;
let triggerFound = 0;
let pressed = 0;
let wait = 0;
let ifWaiting = 0;
let flash;
let flashed = false;
let flashTimer = 0;
let won = false;
let fail = false;
let lost = false;
let sigmaCut = false;
let ground;
//images
function preload() {
	sigmaImage = "https://media.sketchfab.com/models/d963963dd3ca43b28e305f4cb5d416cd/thumbnails/e2c489b98f334ef5b3d29d033620dfa0/8daa486071c04e1c82b8e2ccdd2dffe9.jpeg"
	sigmaLeftImage = 'Images/leftCameraman.jpg'
	sigmaRightImage = 'Images/RightCameraman.jpg'
	skibidiImage = 'Images/hq720.jpg'
	skibidiRightImage = 'Images/skib1.png'
	skibidiLeftImage = 'Images/skib2.png'
	ground = loadImage ('Images/download.jpg')
	music = loadSound('wild_wild_west.mp3');
}

function setup() {
	new Canvas(screenX, screenY);
	
	sigma = new Sprite(750,500);
	sigma.image = sigmaImage;
	sigma.collider = 'kinematic'
	skibidi = new Sprite(1250,500);
	skibidi.collider = 'static'
	skibidi.image = skibidiImage;
	sigma.overlaps(skibidi)
	sigma.scale = (.2)
	skibidi.scale = (.5)
	sigma.diameter = 50;
	world.realTime
	world.gravity.y = 10;
}

function draw() {
	music.play() 
	image (ground, 0, 0, 1920, 960);
	text('when the screen flashes click your mouse',300,200)
	textSize(50)
	time = time+1;
	// trigger
	if (triggerFound == 0){
		trigger = Math.floor(random(3,10));
		//trigger = 5;
		triggerFound = 1;
	}
	//text(trigger,300,400);
	//text(time,300,300);
	//text(Math.floor(world.physicsTime),300,500);
	//text(flashed, 300, 600);
	//text(flashTimer,300,700);
	//text(won,300,800);
	//text(fail, 300, 900);
	//text('trigger',100,400);
	//text('time',100,300);
	//text('worldtimer',50,500);
	//text('flashed', 100, 600);
	//text('flashTimer',50,700);
	//text('won',100,800);
	//text('fail', 100, 900);
	// player
	if(mouse.pressed()) {
		//ifWaiting = 1;
		sigma.moveTo(1750,500,150);
	}
	//if(ifWaiting == 1) {
		//wait++;
	//}
	//if(wait > 20 ) {
		//sigma.moveTo(750,500,150);
		//ifWaiting = 0;
		//wait = 0;
	//}
	// flash
	if(flashed == false && lost == false){
		if(trigger == Math.floor(world.physicsTime)){
			flashed = true
		}
	}
	if (flashed == true){
		flashTimer ++;
	}
	if(flashTimer == 10){
		flash = new Sprite(500,500,10000,10000);
		skibidi.overlaps(flash);
		sigma.overlaps(flash);
		flash.color = 'red'
	}
	if(flashTimer == 30){
		flash.remove();
	}
	if(flashTimer >= 50 && won == false){
		fail = true;
	}
	if(flashTimer <= 0 && mouse.pressed()){
		fail = true;
	}
	if(flashTimer > 20){
		//text('layer1',400,300)
		if (won == false){
			//text('layer2',400,400)
			if (mouse.pressed() && fail == false){
				//text('layer3', 400, 500)
				skibidiRight = new Sprite(1275,500)
				skibidiLeft = new Sprite(1225,500)
				skibidiRight.image = skibidiRightImage;
				skibidiLeft.image = skibidiLeftImage;
				skibidiLeft.scale = (.5);
				skibidiRight.scale = (.5);
				skibidi.remove()
				sigma.overlaps(skibidiLeft);
				sigma.overlaps(skibidiRight);
				won = true;
			}
		}	
	}
	if (won == true) {
		text('great skibidi felled', 600, 350);
	}
	if(fail == true && won == false && lost == false){
		lost = true;
	}
	if(lost == true){
		text('you lose',600,350);
	}
	if(lost == true && sigmaCut == false){
		sigma.remove();
		sigmaLeft = new Sprite(1650,500);
		sigmaRight = new Sprite(1850, 500);
		sigmaLeft.image = sigmaLeftImage;
		sigmaRight.image = sigmaRightImage;
		sigmaLeft.scale = (.2);
		sigmaRight.scale = (.2);
		sigmaCut = true;
	}
}
