let counter = 0;
let lineY = 400;
let score = 0;

function increment() {
	counter++;
	fruits.amount = counter;
} //timing !!

function setup() {
	new Canvas(500, 500);
	setInterval(increment, 4000);
	world.gravity.y = 1;

	basket = new Sprite();
	basket.w = 50;
	basket.h = 30;
	basket.y = 400;
	basket.color = ('#b38650');
	basket.collider = 'none';

	fruits = new Group();
	fruits.image = random(['fruits/lemon.png', 'fruits/cherry.png', 'fruits/apple2.png', 'fruits/strawberry2.png', 'fruits/grape.png']);
	fruits.x = () => random(0, 500);
	fruits.y = () => random(-150, 20);

	basket.overlaps(fruits, collect);
}

function collect(basket, fruit) {
	fruit.remove();
	score++;
} //collecting fruit

function draw() {
		background('skyblue');

	if (mouse.presses()) {
		basket.speed = 100;
		basket.moveTo(mouse.x);
	}
fill('black')
text("score", 400, 20);
	text(score, 435, 20);

line(0, lineY, 500, 400) //end line,, you lose when the fruit touches it
	if (mouse.pressing()) {
		basket.color = ('#856136')
	} //visual feedback thingie
	if (mouse.released()) {
		basket.color = ('#b38650')
	}
	
	if (score >= 50) {
		fill('white');
		rect(150, 150, 200, 200);
		fill('black');
		text('you win!', 225, 245);
		text('refresh the page to restart', 180, 263);
		text('(or keep playing like this)', 183, 281);
	}
} 
