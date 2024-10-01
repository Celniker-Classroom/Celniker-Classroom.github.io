let ball,floor, celling;
let lazers, lazer;
let obstacle, obstacles;

function setup() {
	new Canvas(1000, 400, 'fullscreen');
	background(0, 2, 102);

	//create ship
	ball = new Sprite(0,200);
	ball.diameter = 20;
	ball.collider = 'dynamic';
  
	//creates floor boundry
	floor = new Sprite(0,0,4000,100);
	floor.offset.x = 2000;
	floor.collider = 'static';

	//creates celling  boundry
	celling = new Sprite(0,400,4000,100);
	celling.offset.x = 2000;
	celling.collider = 'static';


	//creates projectile
	lazers = new Group();
		lazer = new Sprite(-50,50);
		lazer.remove(); 

	// create obstacle
  	CreateObstacles();

	
	
} 

//creates a group of obstacles that span accross the screen
function CreateObstacles(){
	obstacles = new Group();
	obstacles.w = 70;
	obstacles.h = 50;
	obstacles.x = (i) => i * 300 + 300;
	obstacles.y = 100;
	obstacles.amount = 13;
	

}     

//when lazer touches an obstacle, the obstacle is remvoed
function Remove(lazer, obstacle){
	obstacle.remove();
}
    
//defines the movement of the obstacles.
function ObstacleMovement(){
    obstacles.forEach(obstacle => {
        if(obstacle.y <= 100){
            obstacle.direction = 90;
            obstacle.speed = 6;
        } else if(obstacle.y >= 300){
            obstacle.direction = 270;
            obstacle.speed = 6;
        }
    });
}




 
function MovingvShooting(){
	//when spacebar is released, a projectile is launched forward
	if(kb.released('spacebar')){  
		lazer = new Sprite(ball.x + 50,ball.y, 50 ,5 );
		lazer.life = 20 ; 
		lazer.vel.x =  15  ;
 		world.timeScale = 0.05  ;
		background(0, 2, 102);

		

	}
	//when space is being pressed the speed of the ball increase
	else if(kb.pressing('spacebar')){
		world.timeScale = 0.05 ; 
		background(39, 0, 66);
	}
	//when not being pressed, the ball moves at a speed of 10 
	else{
		ball.vel.x = 7 ; 
		world.timeScale = 1;
	}



	//when ball hits an obstacle, the game ends
	if (ball.overlaps(obstacles)){
		world.timeScale = 0;
	} 
	//when the lazer hits the obstacle, both the obstacle and lazer are removed   
	if (lazer.overlaps(obstacles, Remove)){
		lazer.remove (); 
	}  
}
 


function draw() {
	background(0, 2, 102);
	

	//calls the MovingvShooting and Obsracle Movement  functuin
	MovingvShooting(); 
	ObstacleMovement();

	textSize(12)
	strokeWeight(4);
	fill(255);
	
	text("Press Space bar to Slow Down Time and Release the Space Bar to Release Lazer", 50,130  ,70)
	ball.overlaps(lazer); 	

	text("Press Space bar to Slow Down Time and Release the Space Bar to Release Lazer", 50,4000  ,70)

	 
	//sets the camera to follow ball
	camera.x = ball.x; 




	


}
