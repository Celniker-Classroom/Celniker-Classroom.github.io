let floor, roof, G, ob1, ob2 ;

function setup() {
	new Canvas(750, 200);
	//floor
	floor = new Sprite();
	floor.y = 200;
	floor.w = 850;
	floor.h = 5;
	floor.collider = 'static';
	floor.color = 'green'
	//roof
	roof = new Sprite();
	roof.y = -3;
	roof.w = 850;
	roof.h = 5;
	roof.collider = 'static';
	
	//Guardian
	world.gravity.y = 10;
	G = new Sprite();
	G.d = 30 
	G.y = 150;
	G.x = 200;
	G.image = 'images/player1of2.png'
	//Randomize Obstacles
	//Obstacle 1
	ob1 = new Group();
	ob1.w = 30
	ob1.h = 80
	ob1.x = 850
	ob1.y = 30
	ob1.direction = 0
	ob1.speed = -5
	ob1.collider = 'k'
	ob1.image = 'images/ob 2.png';
	//Obstacle 2
	ob2 = new Group();
	ob2.w = 30
	ob2.h = 80
	ob2.x = 850
	ob2.y = 160
	ob2.direction = 0
	ob2.speed = -5
	ob2.collider = 'k'
	ob2.image = 'images/ob 1.png';3
}
	

function draw() {
	background('skyblue');
	//keyboard
	if (kb.pressing('up')) {
		G.image = 'images/player 3of3.png'
		G.direction = -90;
		G.speed = 3;
	}else G.image = 'images/player1of2.png'
	var spawntype = random(0, 2)
	var spawn = random(0, 60)
	if (spawn>59 && spawntype > 1){
	let ob = new ob1.Sprite()
	}else if (spawn>59){
	let ob = new ob2.Sprite()
	}

	text("Press up arrow to jump. dodge the pipes and survive for as long as possible.", 50, 50);
}