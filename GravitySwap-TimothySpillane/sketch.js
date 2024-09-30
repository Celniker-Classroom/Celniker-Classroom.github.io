let player;
let spike, spike1, spikePos, spikeY;
let playerDeath = 1;
let score = 0;
let coin, coin1, coinPos, coinY;
var spikeCount = 400;// changes length of game
let tutorial = 0;

function setup() {

	frameRate(60)
	new Canvas('2:1');
	player = new Sprite(200, 500, 50, 'd'); // creates player
	player.color = "Blue";

	spike = new Group()
	spike.collider = 'k'

	coin = new Group()
	coin.collider = 'k'


	//creates spikes on the roof
	for (var spikeDist = 25; spikeDist <= spikeCount * 100; spikeDist += 50) // spawns spikes
	{
		spikeY = random(65, 880);
		spikePos = [spikeDist, spikeY];

		spike1 = new spike.Sprite(spikeDist, 15, 50, 'triangle'); // spawns spikes on roof and floor
		spike1.rotation = 180;
		spike1 = new spike.Sprite(spikeDist, 940, 50, 'triangle');

		// gives a player a small buffer before  spawning spikes
		if (spikeDist >= 750) {

			spike1 = new spike.Sprite(spikeDist, spikeY, 50, 'triangle');// spikes that are in the players path
			spike1.rotation = 270;

		}
	}
	for (var coinDist = 1500; coinDist <= spikeCount * 100; coinDist += 2000) {
		coinY = random(65, 880)
		coinPos = [coinDist, coinY]
		if (coinPos[0] != spikePos[0] && coinPos[1] != spikePos[1]) // makes the coins not spawn directly ontop on spikes
		{
			coin1 = new coin.Sprite(coinDist, coinY, random(40, 75));
			coin.collider = 'n'
			coin.color = "yellow"
			coin.textSize = 18
			coin.text = '$';
		}


	}
}
function draw() {
	background(25, 40, 60);

	if (tutorial == 0)
	{
		text("Hold click to swap gravity, and avoid spikes! refresh the page to restart. Press R if you are ready to start.", 50, 150)
		if(kb.pressed('R'))
		{
			tutorial ++;
		}

	}
	
	//player gravity swap
	if (mouse.pressing()) {
		player.velocity.y = -5
		player.color = "Red";
	} else {
		player.velocity.y = 5
		player.color = "Blue";
	}
	// check if player collides with spike
	if (player.colliding(spike)) {
		player.remove();
		playerDeath = 0;
	}
	if (frameCount % 60 == 1 && playerDeath == 1 && tutorial > 0) // adds score every second
	{
		score += 1;
	}
	if (player.x < 11000) 
	{
		if (coin[0].x < player.x - 250) // deletes coins if they go off screen
		{
			coin[0].remove();
		}
	}
	if (player.overlaps(coin))// coin collection
	{
		score += 5;
		coin[0].remove();
	}
	if (playerDeath == 1 && tutorial > 0) // if the player is alive and has completed the tutorial:
	{
		camera.x = player.x + 750; // keep the camera centered to a position right of the player
		player.x += 5; // moves the player	
	} else if (playerDeath == 0) // if the player lost:
	{
		text("PRESS F5 TO RESTART!", 700, 200);
	}
	if (player.x >= 12000) {
		text("Good Job! You  made it to the end of the spike maze!", 500, 500)

	}
	fill(255, 0, 0);
	textSize(30);
	text("you have a score of " + score + " points!", 50, 200)
}