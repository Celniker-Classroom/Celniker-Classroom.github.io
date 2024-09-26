let ball,player,walls,sprite;

function setup() {
	new Canvas(1000, 1000);
	walls = new Group();
	walls.collider = 'static';
	let floor =new walls.Sprite();
    floor.width =1000;
	floor.y=800
	floor.x=600
    player = new Sprite();
	player.y=900
	player.diameter = 50;
	player.vel.x = -2;
    player.vel.y = 0;
	player.img='Sprites/Treasure.hunter.png'
	player.diameter=60;
	player.rotationLock=true;
	
	let wall = new walls.Sprite();
	wall.width = 10;
	wall.height = 1000;
	wall.x=1000
	
	let sall=new walls.Sprite();
	sall.width = 5;
	sall.height = 1000;
	sall.x=0
	let nd2=new walls.Sprite();
	nd2.y=600
	nd2.width=800;
	nd2.x=300
	let nd3=new walls.Sprite();
    nd3.x=550
	nd3.widht=700;
	nd3.y=400
	nd3.w = 900;
	let nd4=new walls.Sprite();
	nd4.y=250;
	nd4.w=850
	nd4.x=350
    sprite = new Sprite;
	sprite.img='Sprites/treasurechest.png';
	sprite.diameter=75
	sprite.y=200
	
}

function draw() 
{
	
	background('skyblue');

	
   
 	 
		if (player.collides(walls)){

			player.vel.x *= 4;
			player.vel.y = 0;
		}
		
	if(kb.pressing('w')){
		player.y -= 2;    
	}
	if(player.collides(sprite)){
		sprite.remove();
	}
	
}
		
	             
