// Declare Variables
let coins;
let wall1, wall2, wall3;
let score;
let timer;
let game;
let laser;
let rails;
let laser_dir;
let laser_timer;
let lasers;
let end_time
let cwh; // half canvas width
let loadheight
let fade;
let coin_speed; 
let game_start;
let fps;
let frame;
let lasers_purge;
let max_coin_speed; // Maximimum coin fall speed


function setup() {
	max_coin_speed = 2;
	frame = 0 // init frames to 0
	game_start = millis() // Set the time at which each round starts
	coin_speed = 1 // Set the coin speed
	end_time = 0 // This is just used for score calculations to get the exact time at which the player loses relative to the start of the code running
	fade = 0; // Used to fade in the GAME OVER menu 
	loadheight = -120 // Used for special effects for the GAME OVER menu
	new Canvas(); // Initialized canvas with screen width and height
	cwh = canvas.w/2 // variable used as a container for half the screen width
	lasers = new Group() // group of laser beams the player fires
	laser_dir = "r" // direction the lasercannon travels on the rails
	rails = new Sprite(cwh, 750, 730, 10, collider = "none") // The rails sprite initialization
	rails.color = "silver" 
	laser = new Sprite(cwh, 732, 50, 50, collider = "none") // Laser cannon initialization
	laser.image = "assets/lasercannon.png"
	lasers_purge = new Sprite(cwh, -20, canvas.w, 40, collider = "none") // Initialize a collector for the lasers to prevent memory overload
	game = true; // Starting game as true
	score = 0; // Starting score at 0
	laser_timer = millis() // Timer to prevent spam laser fire which could potentially overload computer (if enough are spawned)
	timer = millis() - 2500 
	coins = new Group(); // Initiallize coin group
	wall1 = new Sprite(cwh - 380, 500, 30, 1000, collider = "static") // Create the boundaries
	wall1.color = "#39FF14"
	wall2 = new Sprite(cwh + 380, 500, 30, 1000, collider = "static")
	wall2.color = "#FF10F0"
	wall3 = new Sprite(cwh, 900, 730, 1/3*730, collider = "none") // Create a net for gold collection
	wall3.image = "assets/net.png"



}

function update_coins(){
	falsecoin = random([0,1,2,3,4,5,6,7]) // Pick a random coin out of the 8 gold to be fake
	for(var i = 0; i <= 7; i++){
		let coin = new coins.Sprite() // Initialize the 8 coins
		coin.width = 20
		coin.height = 20
		coin.y = 10;
		coin.x = i * 80 + cwh - 350 + 75
		if(i == falsecoin){ // Set the false one to false and give it a false sprite and the rest get set to true and are given the gold sprite
			coin.gold = false
			coin.image = "assets/false.png"
		}else{
			coin.gold = true
			coin.image = "assets/gold.png"
		}
	}
}

function collect(wall3, coin){ // Define coin collection
	score += 1
	
	if(coin.gold == false){
		game = false;
	}else
	{
		coin.remove()
	}
}

function update_laser(){ // Player update function (updates once per frame)
	if(laser_dir == "r" && laser.x <= cwh + 300){
		laser.x += 4
	}
	else if( laser_dir == "r" && laser.x >cwh + 300){
		laser_dir = "l"
	}
	else if(laser_dir == "l" && laser.x >= cwh - 300){
		laser.x -= 4
	}
	else if(laser_dir == "l" && laser.x < cwh - 300){
		laser_dir = "r"
	}
}

function laser_fire(){ // Laser fire function to allow the player to fire laser beams
	laser_timer = millis()
	let blast = new lasers.Sprite()
	blast.x = laser.x
	blast.y = laser.y - 50
	blast.collider = "none"
	blast.color = "red"
	blast.w = 6
	blast.h = 15
	blast.velocity.y = -5
}
function hit(coin, blast){ /* When a false gold is hit the laser disappears and the false coin also disappears but when real gold is hit only the gold disappears 
	(this is to reward good aim) */
	if(coin.gold){
		coin.remove()
	}
	else{
	coin.remove()
	blast.remove()
}
	
}
function game_over(){ // Game Over function for when the game ends
	allSprites.removeAll()
	background("skyblue")
	if(end_time == 0){
		end_time = round((millis() - game_start) / 1000)
	}
	if(loadheight < 350){ // Slowly appear into frame
		loadheight += 2.1
	}
	if(fade < 255){ // Fade in
		fade +=1
	}
	fill(0,0,0,fade)
	textSize(40)
	text("Game Over!", cwh, loadheight - 50)
	textSize(24)
	textAlign(RIGHT)
	text("+", cwh - 100, loadheight + 25)
	text("+", cwh - 100, loadheight + 75)
	textAlign(CENTER)
	text("Score: " + score, cwh, loadheight) // Rewards people for not spamming
	text("Time Bonus: " + end_time, cwh, loadheight + 50) // Rewards longer runs
	text("Efficiency Bonus: " + round(score/end_time) * 50, cwh, loadheight + 100) // Efficiency bonus to reward good aim and avoiding real gold 
	text("__________________________________", cwh, loadheight + 125)
	text("Final Score: " + (score + end_time + round(score/end_time) * 50), cwh, loadheight + 175) // Overall final score



}

function update_coin_speed(){ // Set and limit coin speed
	coin_speed = 1 + 1 * ((millis() - game_start)/50000) // Update coin speed over time
	if (coin_speed > max_coin_speed){
		coin_speed = max_coin_speed
	}
}

function purge(collector, blast){
	blast.remove()
}

function main_runner(){ // Define the main game runner
	update_coin_speed() // Set and limit speed
	coins.velocity.y = 0.8 * coin_speed // Coin initial velocity

	if(game){
		background("skyblue")
		textSize(20)
		text("Try to hit the bronze coins", cwh+600, 25)
		text("collect the gold coins",cwh+600, 75)
		text("use space to fire", cwh+600, 125)
		wall3.overlaps(coins, collect) // Collect gold coins and end gameloop if falsecoin collected
		lasers_purge.overlaps(lasers, purge)
		if(millis() - timer >= 3000 / coin_speed){ // updates for coins
			update_coins()
			timer = millis()

		}
		textSize(40)
		textAlign(CENTER)
		text(score, cwh, 50)
		update_laser() // Update laser every frame
		if(keyboard.pressed(" ") && millis() - laser_timer >= 100){
			laser_fire()
		}
		for(var i = 0; i<coins.length; i ++){ // Call overlaps when a laser hits a coin
			coins[i].overlaps(lasers, hit)
		}
		text("Fall Speed: " + round(coin_speed, 2), 150, 100)
}
	else{
		game_over() // Call gameover function on the end of the game
	}
}



function draw() {
	main_runner() // Call the main function to run the game
}

