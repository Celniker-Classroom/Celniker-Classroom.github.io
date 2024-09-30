let player, floor, floora, gems, monster, die, wall, gostwall ,score,ji,kg
let points = 0;
let run = 0;

function setup() {
	new Canvas(1920, 1080, 'fullscreen');
	world.gravity.y = 30;
	player = new Sprite(100, 850);
	player.d = 50   
	player.img = '😱'
	floor = new Sprite(1900, 900, 5000, 40, 'static');
	floora = new Sprite(1900, 500, 5000, 40, 'static');
	//floor and griavty player
	monster = new Sprite(0, 855)
	monster.img = '👻'
	monster.h = 1000
	monster.collider = 'none';
	//monster 
	gems = new Group();
	gems.diameter = 50;
	gems.x = () => random(player.x + 200, player.x + 1000);
	gems.y = () => random(810, 500);
	//gem spwn in radom spot 
	wall = new Group();
	wall.x = () => random(player.x + 500, player.x + 90000);
	wall.y = () => random(810, 600);
	wall.w = 10;
	wall.h = 90;
	wall.collider = 'static';
	//wall spwn in radom spot
	gostwall = new Group();
	gostwall.x = () => random(player.x + 500, player.x + 90000);
	gostwall.y = () => random(820, 600);
	gostwall.w = 10;
	gostwall.h = 90;
	gostwall.collider = 'none';
	gostwall.color = 'white';
	//gost wall is a wall you can pass through
	score =  new Sprite(10,100,200,100);
	score.collider = 'none';
	// ji = new Sprite(10,400,200,100)
	// ji.collider = 'none'
	//scorebord
	kg = new Sprite(1000,100)
	kg.img = 'score.png'
	kg.collider = 'none'
	text = 'space to jump'
}

function draw() {
	
	
	// ji.text = run++
	// ji.textSize = 60;
	// //score
	floora.w = player.x + 1000
	floora.x = player.x + 100
	floor.w = player.x + 1000
	floor.x = player.x + 100
	//the two floor gets longer when player move 
	
	wall.amount = 50;
	gostwall.amount = 50;
	gems.img = random(['gem.png', '💎', '💰']);
	gems.amount = 3;
	//the amount of radom thing 
	player.overlaps(gems, collect);
	//player cna cllect gems
	monster.overlaps(player, collect)
	
	//monster eat player
	player.x = player.x + 10
	
	//speed of player
	monster.x = monster.x + 9
	//speed of monster    
	clear();
	if (kb.presses()) {
		player.vel.y = -8;
	}
	//player can junp
	camera.x = player.x;
	//  camera follow the player
	score.x =camera.x+800
	// ji.x = camera.x+800
	kg.x =camera.x+500
	//the score bord
	
		  
	

}
function collect(player, gems) {
	gems.remove();
	points++ 
	score.text = points;
	score.textSize=60;
}
//player cllocat gem

