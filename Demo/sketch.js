let ball;
let dots;


function setup() {
    new Canvas(700, 800);
    world.gravity.y = 10;


    ball = new Sprite(); // Creates ball
    ball.d = 30;
    ball.x = 50;
    ball.y = 0;


    orb = new Sprite(); // Creates ball
    orb.d = 30;
    orb.x = 500;
    orb.y = 0;
   


    ramps = new Group(); // Creates sloped ramps on left side of screen
    ramps.x = 70;
    ramps.w = 400;
    ramps.h = 5
    ramps.collider = 's';
    ramps.rotation = 10


    for (let i = 100; i < 700; i += 70){
        let ramp = new ramps.Sprite();
        ramp.y = i;
    }


    // Creates ramps on right side of the screen
    ramps2 = new Group();
    ramps2.x = 700;
    ramps2.w = 800;
    ramps2.h = 5;
    ramps2.collider = 's';
    ramps2.rotation = -10;


    for (let i = 105; i < 700; i += 70){
        let ramp2 = new ramps2.Sprite();
        ramp2.y = i;
    }


}
function draw() {
    background('skyblue');

}

