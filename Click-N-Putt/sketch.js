let player, ground, aim, clicks = 0, flip = false, flag, water, hole = 1, strokes = 0, par = 17, Flag = `
..rrbb....
.rrrbb....
rrrrbb....
....bb....
....bb....
....bb....`;
function setup() {//Create groups, spawn sprites, etc
    new Canvas("2:1");
    frameRate(60);
    aim = new Sprite(width / 8, height / 2, 10, 100, 'none');
    aim.offset.y = -50;
    world.gravity.y = 5;
    aim.scale.x = 0.5;
    aim.rotation = 0;
    player = new Sprite(width / 8, height / 2, 50, 'd');
    ground = new Group();
    ground.color = 'green';
    player.image = '😃';
    player.rotationDrag = 2.5;
    water = new Sprite(width / 2, height / 1.2, width * 5, 10, 'static');
    water.color = 'blue';
    holePicker();
}
function holePicker() {//Runs the function for the hole the player's on
    if (hole == 1) {
        hole1();
    }
    if (hole == 2) {
        hole2();
    }
    if (hole == 3) {
        hole3();
    }
    if (hole == 4) {
        hole4();
    }
    if (hole == 5) {
        hole5();
    }
}
//Functions to draw the holes
function hole1() {
    var floor = new ground.Sprite(width / 8, height / 2 + 25, width / 5, 10, 'static');
    var floor2 = new ground.Sprite(7 * width / 8, height / 2 + 25, width / 5, 10, 'static');
    flag = new Sprite(7 * width / 8, height / 2 - 27.5, 50, 100, 'none');
    flag.img = spriteArt(Flag, 16);
}
function hole2() {
    var floor = new ground.Sprite(width / 8, height / 2 + 25, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8, height / 1.3, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8 - width / 10, height / 2 + height / 6, 10, 150, 'static');
    floor = new ground.Sprite(1330, 575, 400, 10, 'static');
    floor.offset.x = -100;
    floor.rotation = 337.5;
    floor = new ground.Sprite(width / 3, height / 1.35, width / 2, 10, 'static');
    flag = new Sprite(7 * width / 8, height / 1.3 - 50, 50, 100, 'none');
    flag.img = spriteArt(Flag, 16);
}
function hole3() {
    var floor = new ground.Sprite(width / 8, height / 2 + 25, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8, height / 1.3, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8 + 200, height / 1.4, 10, 100, 'static');
    flagloor = new ground.Sprite(width / 8, height / 1.3, 300, 10, 'static');
    flag = new Sprite(width / 8, height / 1.4, 50, 100, 'none');
    flag.img = spriteArt(Flag, 16);
}
function hole4() {
    var floor = new ground.Sprite(width / 8, height / 2 + 25, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8, height / 3.25, 200, 10, 'static');
    floor = new ground.Sprite(6.5 * width / 8, height / 6, 10, 100, 'static');
    floor = new ground.Sprite(6 * width / 8 - 155, height / 2.2 + 150, 600, 10, 'static');
    floor.offset.x = 100;
    floor.rotation = 315;
    floor = new ground.Sprite(width / 4.5, height / 2 + 25, 710, 10, 'static');
    floor.offset.x = 350;
    floor.rotation = 18.5;
    flag = new Sprite(7 * width / 8, height / 4, 50, 100, 'none');
    flag.img = spriteArt(Flag, 16);
}
function hole5() {
    var floor = new ground.Sprite(width / 8, height / 2 + 25, width / 5, 10, 'static');
    floor = new ground.Sprite(7 * width / 8, height / 3, 10, 200, 'static');
    floor = new ground.Sprite(7 * width / 8 - 100, height / 1.5, 400, 10, 'static');
    floor = new ground.Sprite(width / 2, height / 8, 200, 10, 'static');
    floor = new ground.Sprite(width / 2 - 100, height / 8 - 100, 10, 200, 'static');
    flag = new Sprite(width / 2, height / 8 - 50, 50, 100, 'none');
    flag.img = spriteArt(Flag, 16);
}
function draw() {
    //Make sure the aim goes around the player
    aim.x = player.x;
    aim.y = player.y;
    //Resets player's position on contact with water
    if (player.collides(water)) {
        allSprites.remove();
        holePicker();
        setup();
    }
    if (player.overlaps(flag)) {//Increases hole by 1 and reruns holePicker when flag is reached
        allSprites.remove();
        hole++;
        setup();
    }
    if (clicks == -1) {//Makes it so that the aim reticle disappears while moving and reappears when the player stops
        aim.visible = false;
        if (!player.isMoving) {
            clicks++;
            aim.visible = true;
            aim.rotation = 0;
            player.rotation = 0;
        }
    }
    background('skyblue');
    if(hole == 1){
        textSize(50);
        text("Click to aim, then click again to fire!", width / 2 - 400, height / 2);
    }
    if (mouse.pressed() && clicks != -1) {//Used to make clicking do different things
        clicks++;
    }
    if (clicks == 0) {//Spins the aim
        aim.rotation += 2;
    }
    if (clicks == 1) {//Changes the scale of the aim to represent power differences
        if (aim.scale.x >= 1.5) {
            flip = true;
        }
        if (aim.scale.x <= 0.4) {
            flip = false;
        }
        if (flip == true) {
            aim.scale.x -= 0.025;
        }
        if (flip == false) {
            aim.scale.x += 0.025;
        }
    }
    if (clicks == 2) {//Launches player in aim's direction and increases the player's strokes
        player.velocity.x = (player.x + (cos(aim.rotation - 90) * 100) - player.x) * aim.scale.x * width / 15390 / 1.5;
        player.velocity.y = (player.y + (sin(aim.rotation - 90) * 100) - player.y) * aim.scale.x * width / 15390 / 1.5;
        clicks = -1;
        strokes++;
    }
    if (hole != 6) {//If the player isn't finished
        textSize(50);
        text("Strokes: " + strokes, 0, height);
    }
    else {//If the player finished the game
        allSprites.remove();
        textSize(75);
        text('Score: ' + (strokes - par), width / 2 - 180, height / 2);
    }
}