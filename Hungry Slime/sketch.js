let slime, cookies, floor, mouth, vegetables, start, instructions, three, two, one;
let score = 0
function setup() {
	new Canvas(500, 500);
	world.gravity.y = 20 
	time = 0


	//floor
	floor = new Sprite(250,475);
	floor.l = 50;
	floor.w = 510;
	floor.collider = 'n'
	floor.y = 350
	floor.img = 'Images/floor.png'

	//slime
	slime = new Sprite(250,300);
	slime.y = 357
	slime.diameter = 200;
	slime.img = 'Animation/slime1.png';
	slime.collider = 'n';
	slime.scale = 1.2
	//cookies
	cookies = new Group();
	cookies.img = 'Images/cookie.png';
	cookies.d = 35;
	cookies.collider = 'd';
	cookies.scale = 0.3;


	//vegetables
	vegetables = new Group();
	vegetables.img = 'Images/vegetable.png'
	vegetables.d = 35
	vegetables.collider = 'd'
	vegetables.scale = 0.3
	//opening mouth animation
	mouth = new Sprite(250,365);
	mouth.img = 'Animation/slime2.png'
	mouth.scale = 1.2
	mouth.y = 357
	mouth.collider = 'n'
	mouth.opacity = 0
	//invisible mouth
	
	invisible_mouth = new Sprite(250,389,180,65);
	invisible_mouth.collider = 'n'
	invisible_mouth.opacity = 0


	instructions = new Sprite();
	instructions.scale = 0.2
	instructions.img = 'Images/instructions.png'
	instructions.y = 150
	instructions.x = 250
	instructions.collider = 'n'


	
}


function spawn_cookies(spawn_time, random_x, random_y){
	if (time == spawn_time) 
		{ 
		let cookie = new cookies.Sprite();
		cookie.x = random_x
		cookie.y = random_y

	}
}

function spawn_vegetables(spawn_time, random_x, random_y){
	if (time == spawn_time) 
		{ 
		let vegetable = new vegetables.Sprite();
		vegetable.x = random_x
		vegetable.y = random_y
		vegetable.img = 'Images/vegetable.png'

	}
}
	function spawn_three(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				three = new Sprite();
				three.img = 'Images/three.png';
				three.collider = 'd'
				three.x = 250
				three.y = 0
		}
}

	function spawn_two(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				two = new Sprite();
				two.img = 'Images/two.png';
				two.collider = 'd'
				two.x = 250
				two.y = 0
		}
}

	function spawn_one(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				one = new Sprite();
				one.img = 'Images/one.png';
				one.collider = 'd'
				one.x = 250
				one.y = 0
		}
}	

	function spawn_start(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				start = new Sprite();
				start.scale = 1
				start.y = 0
				start.img = 'Images/start.png'
		}
}	


function draw() {
	background('skyblue');
	time ++
	//score
	textSize(50);
	fill(255);
	stroke(0);
	strokeWeight(5);
	text(score,25,80);
	
	

	//space  
	//eating cookies
	if (kb.pressing(' ')) {
		if (invisible_mouth.overlapping(cookies))
			{ 
				cookies[0].remove(); 
				score += 1
			}
		
	 } else if (kb.released(' ')) {
		cookies.collider = 'd';
		mouth.collider = 'n' 
		
	}
	if (kb.pressing(' ')) {
		if (invisible_mouth.overlapping(vegetables))
			{ 
				vegetables[0].remove(); 
				score -= 1
			}
		
	 } else if (kb.released(' ')) {
		cookies.collider = 'd';
		vegetables.collider = 'd';
		mouth.collider = 'n';
	}

	if (kb.pressing(' ')) {
		mouth.opacity = 1
	} else if (kb.released(' ')) {
		mouth.opacity = 0
	}
	//Spawning cookies and numbers
	spawn_three(250, 250, 0);
	spawn_two(330, 250, 0);
	spawn_one(410, 250, 0);
	spawn_start(490, 250, 0);

	spawn_cookies(570, random(160,340), random(0,10))
	// spawn_vegetables(160, random(165,330), random(0,10))
	// spawn_cookies(190, random(160,340), random(0,10))
	// spawn_cookies(200, random(160,340), random(0,10))
	// spawn_vegetables(210, random(165,330), random(0,10))
	// spawn_cookies(240, random(160,340), random(0,10))
	// spawn_vegetables(243, random(165,330), random(0,10))
	// spawn_cookies(300, random(160,340), random(0,10))
	// spawn_cookies(350, random(160,340), random(0,10))
	// spawn_vegetables(352, random(165,330), random(0,10))
	// spawn_cookies(430, random(160,340), random(0,10))
	// spawn_vegetables(435, random(165,330), random(0,10))
	// spawn_cookies(450, random(160,340), random(0,10))
	// spawn_cookies(500, random(160,340), random(0,10))
	// spawn_vegetables(510, random(165,330), random(0,10))
	// spawn_cookies(550, random(160,340), random(0,10))
	// spawn_cookies(600, random(160,340), random(0,10))
	// spawn_vegetables(605, random(165,330), random(0,10))
	// spawn_cookies(650, random(160,340), random(0,10))
	// spawn_vegetables(655, random(165,330), random(0,10))
	// spawn_cookies(680, random(160,340), random(0,10))
	// spawn_cookies(700, random(160,340), random(0,10))
	// spawn_vegetables(710, random(165,330), random(0,10))
	// spawn_cookies(750, random(160,340), random(0,10))
	// spawn_cookies(800, random(160,340), random(0,10))
	// spawn_vegetables(805, random(165,330), random(0,10))
	// spawn_cookies(840, random(160,340), random(0,10))
	
	


}
