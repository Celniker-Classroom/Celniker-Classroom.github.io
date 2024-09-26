let ball;

function setup() {
	new Canvas(1900, 900);
	//platform
	ground = new Sprite()
	ground.x = 950
	ground.y = 700
	ground.h = 200
	ground.w = 1902
	ground.image = 'i/ground.png'


	//fellow beam
	beamO = new Sprite()
	beamO.x = 690
	beamO.y = 490
	beamO.w = 520
	beamO.h = 30
	beamO.color = 'skyblue'
	beamO.stroke = 'skyblue'

	//fella beam
	beamP = new Sprite()
	beamP.x = 1210
	beamP.y = 490
	beamP.w = 520
	beamP.h = 30
	beamP.color = 'skyblue'
	beamP.stroke = 'skyblue'

	//marker
	marker = new Sprite()
	marker.x = 950
	marker.w = 1
	marker.h = 80
	marker.y = 490
	marker.collider = 'none'
	marker.image = 'i/beams2.gif'

	//fellow
	thing = new Sprite()
	thing.collider = 'none'
	thing.x = 170
	thing.y = 490
	thing.w = 400
	thing.h = 110
	thing.color = 'skyblue'
	thing.stroke = 'skyblue'
	fellow = new Sprite()
	fellow.x = 400
	fellow.y = 500
	fellow.h = 100
	fellow.w = 60
	fellow.image = 'i/backround.png'
	h = new Sprite()
	h.collider = 'none'
	h.x = 272
	h.y = 505
	h.image = 'i/fellow fighting.gif'

	//fella
	thingy = new Sprite()
	thingy.collider = 'none'
	thingy.x = 1720
	thingy.y = 490
	thingy.w = 380
	thingy.h = 110
	thingy.color = 'skyblue'
	thingy.stroke = 'skyblue'
	fella = new Sprite()
	fella.x = 1500
	fella.y = 500
	fella.h = 100
	fella.w = 60
	fella.image = 'i/backround.png'
	q = new Sprite()
	q.x = 1628
	q.y = 505
	q.image = 'i/fella fighting.gif'

	//start screen
	screen = new Sprite()
	screen.x = 950
	screen.y = 450
	screen.collider = 'none'
	screen.w = 1900
	screen.h = 900
	screen.image = 'i/pause.png'
	button = new Sprite()
	button.x = 950
	button.y = 300
	button.w = 200
	button.h = 100
	button.image = 'i/next.png'
	button.color = 'red'
	button.collider = 'none'

}

function draw() {
	background('skyblue');
	//clash controlls
	if (kb.presses('a')) {
		beamP.x = beamP.x + 25;
		beamP.w -= 50;
		beamO.x = beamO.x + 25;
		beamO.w += 50;
		marker.x = marker.x + 50
	}
	if (kb.presses('l')) {
		beamP.x = beamP.x - 25;
		beamP.w += 50;
		beamO.x = beamO.x - 25;
		beamO.w -= 50;
		marker.x = marker.x - 50
	}
	//win/lose detectors
	if (beamO.overlaps(fella)) {
		q.remove()
		beamO.remove()
		h.remove()
		fellow.x = fellow.x-80
		fellow.y = fellow.y-50
		fellow.image = 'i/win1.gif'
		fella.image = 'i/loose2.gif'
		beamP.remove()
		marker.remove()
	}
	if (beamP.overlaps(fellow)) {
		beamO.remove()
		q.remove()
		h.remove()
		fella.x = fella.x+80
		fella.y = fella.y-50
		fella.image = 'i/win2.gif'
		fellow.image = 'i/loose1.gif'
		beamP.remove()
		marker.remove()
	}
	//buttons work
	if (mouse.pressed() && mouseY > 250 && mouseY < 350 && mouseX > 850 && mouseX < 1050) {
		button.remove()
		screen.remove()
		screen2 = new Sprite()
		screen2.x = 950
		screen2.y = 450
		screen2.collider = 'none'
		screen2.image = 'i/other.png'
		next = new Sprite()
		next.x = 950
		next.y = 450
		next.collider = 'none'
		next.w = 200
		next.h = 100
		next.image = 'i/next.png'
	}
	if (mouse.pressed() && mouseY > 400 && mouseY < 500 && mouseX > 850 && mouseX < 1050) {
		next.remove()
		screen2.remove()
		attack = new Sprite()
		attack.x = 950
		attack.y = 450
		attack.collider = 'none'
		attack.image = 'i/attack.png'
		start = new Sprite()
		start.x = 710
		start.y = 450
		start.w = 200
		start.h = 100
		start.collider = 'none'
		start.image = 'i/start button.png'
	}
	if (mouse.pressed() && mouseY > 400 && mouseY < 500 && mouseX > 610 && mouseX < 810){
		start.remove()
		attack.remove()
	}

}
