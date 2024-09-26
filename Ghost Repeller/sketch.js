let enemies;
let wall;
let conveyer;
let timer;
let ball;
let score;
let jump;

function setup() {
    score = 0;
    new Canvas();
    //enemy
    enemies = new Group()
    //wall
    wall = new Sprite(20,650,50,400, collider="none");
    //conveyer
    conveyer = new Sprite(800,700, 1500, 70,collider = "static")
    timer = 0
    //eating sprite
    ball = new Sprite(170,626);
	ball.diameter = 80;
	ball.img = '😀';
	ball.collider = 'd';
	world.gravity.y = 10;
    //jump
    jump = 0;
}

function spawn_enemy(){
    var enemy = new enemies.Sprite()
    enemy.x = 1475
    enemy.y = 650

    enemy.evil = random([true, false])

    if(enemy.evil){
        enemy.image = "ghost scary.png";
    }else{
        enemy.image = "🥚";
    }

    enemy.velocity.x = -20
    
    
    

}

function collect(enemy_collector, enemy){
    enemy.remove()
    if(!enemy.evil){
        score-=50;
    }
}
function eggcollect(player, egg){
    if(egg.evil){
        score -= 500
    }else{
      egg.remove();
      score += 100
    }
}

function draw() {
    background("#0c1b3b")
    wall.overlaps(enemies, collect)
    if(millis()-timer>1000){
        timer = millis()
        spawn_enemy();
    }
    if(ball.colliding(conveyer)){
        jump=0;
    }
    if(keyboard.presses('w') && (ball.colliding(conveyer) || jump<2) ) {
     ball.velocity.y = -5;
     jump+=1;
	}
    ball.overlaps(enemies, eggcollect);
    fill('white');
    textSize(24)
    text('press w to jump over the ghost', 900,200);
    text('if you hit the ghost you lose 500 points ', 900,300);
    text('if you hit the egg you gain 100 points ', 900,100);
    textSize(15);
    text('You can double jump if it is too challenging', 1000,400);
    text('DO NOT JUMP OVER THE EGG! If you do -50 points', 900,150);
    textSize(30);
    text(score, canvas.w/2, 40);
    if (kb.released('w')) {
		background(0, 0, 255);
	}
	if (kb.presses('w')) {
		background(0, 0, 0)
	}

}