let slime, cookies, floor, mouth, vegetables, start, instructions, minus, three, two, one;
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
	floor.img = 'images/floor.png'

	//slime
	slime = new Sprite(250,300);
	slime.y = 357
	slime.diameter = 200;
	slime.img = 'Animation/slime1.png';
	slime.collider = 'n';
	slime.scale = 1.2
	//cookies
	cookies = new Group();
	cookies.img = 'images/cookie.png';
	cookies.d = 35;
	cookies.collider = 'd';
	cookies.scale = 0.3;


	//vegetables
	vegetables = new Group();
	vegetables.img = 'images/vegetable.png'
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
	instructions.scale = 0.23
	instructions.img = 'images/instructions.png'
	instructions.y = 65
	instructions.x = 280
	instructions.collider = 'n'

	minus = new Sprite();
	minus.img = 'images/minus.png'
	minus.opacity = 0
	minus.collider = 'n'

	
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
				three.img = 'images/three.png';
				three.collider = 'd'
				three.x = 250
				three.y = 0
		}
}

	function spawn_two(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				two = new Sprite();
				two.img = 'images/two.png';
				two.collider = 'd'
				two.x = 250
				two.y = 0
		}
}

	function spawn_one(spawn_time, x, y){
		if (time == spawn_time) 
			{ 
				one = new Sprite();
				one.img = 'images/one.png';
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
				start.img = 'images/start.png'
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
	text(score,19,80);
	
	

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
				minus.opacity = 1
			}
		
	 } else if (kb.released(' ')) {
		cookies.collider = 'd';
		vegetables.collider = 'd';
		mouth.collider = 'n';
		minus.opacity = 0
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
	spawn_vegetables(580, random(165,330), random(0,10))
	spawn_cookies(590, random(160,340), random(0,10))
	spawn_cookies(610, random(160,340), random(0,10))
	spawn_vegetables(615, random(165,330), random(0,10))
	spawn_cookies(640, random(160,340), random(0,10))
	spawn_vegetables(643, random(165,330), random(0,10))
	spawn_cookies(670, random(160,340), random(0,10))
	spawn_cookies(690, random(160,340), random(0,10))
	spawn_vegetables(702, random(165,330), random(0,10))
	spawn_cookies(720, random(160,340), random(0,10))
	spawn_cookies(750, random(160,340), random(0,10))
	spawn_vegetables(735, random(165,330), random(0,10))
	spawn_vegetables(755, random(165,330), random(0,10))
	spawn_cookies(770, random(160,340), random(0,10))
	spawn_cookies(775, random(160,340), random(0,10))
	spawn_vegetables(790, random(165,330), random(0,10))
	spawn_vegetables(800, random(165,330), random(0,10))
	spawn_cookies(815, random(160,340), random(0,10))
	spawn_vegetables(835, random(165,330), random(0,10))
	spawn_cookies(850, random(160,340), random(0,10))
	spawn_cookies(867, random(160,340), random(0,10))
	spawn_vegetables(870, random(165,330), random(0,10))
	spawn_cookies(897, random(160,340), random(0,10))
	spawn_vegetables(900, random(165,330), random(0,10))
	spawn_cookies(950, random(160,340), random(0,10))
	spawn_cookies(970, random(160,340), random(0,10))
	spawn_vegetables(975, random(165,330), random(0,10))
	spawn_cookies(990, random(160,340), random(0,10))
	spawn_cookies(995, random(160,340), random(0,10))
	spawn_vegetables(1005, random(165,330), random(0,10))
	spawn_cookies(1008, random(160,340), random(0,10))
	spawn_vegetables(1015, random(165,330), random(0,10))
	spawn_cookies(1025, random(160,340), random(0,10))
	spawn_cookies(1040, random(160,340), random(0,10))
	spawn_vegetables(1046, random(165,330), random(0,10))
	spawn_cookies(1060, random(160,340), random(0,10))
	spawn_cookies(1080, random(160,340), random(0,10))
	spawn_vegetables(1085, random(165,330), random(0,10))
	spawn_cookies(1200, random(160,340), random(0,10))

}
