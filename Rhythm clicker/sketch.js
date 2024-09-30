let wall_left
let wall_right
let note_collider
let time
let notes
let note
let score
let scoreboard
let note_delete
let fall_check
let score_streak
let directions
let extra_points_collider
// let scoreboard
let score_penalty
function setup() {
	new Canvas(500, 700);
	//set variables
	score_streak = 1;
	time = 0;
	score = 0;
	score_penalty = 0;
	note_delete = 0
	//set up stage
	wall_right = new Sprite(75, 400, 150, 800, 's');
	wall_right.color = 'green'
	wall_left = new Sprite(425, 400, 150, 800, 's');
	wall_left.color = 'green'
	//where you want the notes to be
	note_collider = new Sprite(250, 500, 200, 40, 's');
	note_collider.color = 'green';
	//more points if click here
	extra_points_collider = new Sprite(250,525, 200, 1, 's')
	extra_points_collider.color = 'red'
	//notes
	notes = new Group();
	notes.velocity.y = 5;
	notes.collider = 'd';
	notes.x = 250;
	notes.y = -10;
	notes.w = 20;
	notes.h = 20;

	//makes notes not delete if they fell off screen
	fall_check = new Sprite(250, 570, 130, 1, 's')
	fall_check.opacity = 0

	//notes pass through


	notes.overlaps(note_collider)
	notes.overlaps(fall_check)
	notes.overlaps(extra_points_collider)

	//score display
	scoreboard = new Sprite(50, 20, 100, 100, 's');
	scoreboard.color = 'green'
	scoreboard.strokeWeight = 0

	frameRate(60)

	//how to play
	directions = new Sprite(70, 350, 140, 50, 'n')
	directions.text = 'press space: delete notes'
	directions.color = 'green'
	directions.strokeWeight = 0



}

//spawn notes
function spawn_note(spawn_time) {
	if (time == spawn_time) {
		note = new notes.Sprite();
	}
}
function draw() {
	time++
	extra_points_collider.color = 'red'
	background('skyblue');
	//all notes to spawn
	spawn_note(20);
	spawn_note(40);
	spawn_note(60);
	spawn_note(80);
	spawn_note(100);
	spawn_note(120);
	spawn_note(140);
	spawn_note(157);
	spawn_note(164);
	spawn_note(171);
	spawn_note(186);
	spawn_note(206);
	spawn_note(226);
	spawn_note(246);
	spawn_note(266);
	spawn_note(286);
	spawn_note(303);
	spawn_note(310);
	spawn_note(317);
	spawn_note(332);
	spawn_note(352);
	spawn_note(372);
	spawn_note(392);
	spawn_note(412);
	spawn_note(417);
	spawn_note(422);
	spawn_note(427);
	spawn_note(432);
	spawn_note(437);
	spawn_note(442);
	spawn_note(457);
	spawn_note(470);
	spawn_note(500);
	spawn_note(515);
	spawn_note(520);
	spawn_note(540);
	spawn_note(560);
	spawn_note(575);
	spawn_note(580);
	spawn_note(600);
	spawn_note(630);
	spawn_note(650);
	spawn_note(660);
	spawn_note(670);
	spawn_note(680);
	spawn_note(690);
	spawn_note(720);
	spawn_note(750);
	spawn_note(760);
	spawn_note(770);
	spawn_note(780);
	spawn_note(790);
	spawn_note(820);
	spawn_note(840);
	spawn_note(850);
	spawn_note(860);
	spawn_note(870);
	spawn_note(880);
	spawn_note(910);
	spawn_note(917);
	spawn_note(937);
	spawn_note(944);
	spawn_note(964);
	spawn_note(971);
	spawn_note(991);
	spawn_note(1011);
	spawn_note(1016);
	spawn_note(1021);
	spawn_note(1026);
	spawn_note(1031);



	//press space to collide with collector
	if (kb.presses(' ')) {
		if (extra_points_collider.overlapping(notes))
			{
				notes[note_delete].remove();
				score = score + 1000*score_streak
				score_streak ++
				extra_points_collider.color = 'green'
				
			}
		else if (note_collider.overlapping(notes)) {
			notes[note_delete].remove();
			score = score + 100 * score_streak;
			score_streak++
			note_collider.color = 'red'

		}
		else if (score_penalty >= 20) {
			score -= 100 * (0 - score_penalty ^ 2 - 20);
			score_streak = 1
			score_penalty++;
		}
		else {
			score_penalty++;
			score_streak = 1
		}
	}
	else {
		note_collider.color = 'green'
	}
	//fix issue with notes
	if (fall_check.overlaps(notes)) {
		note_delete++
		score_penalty++
		score_streak = 0
	}

	//update score
	scoreboard.text = 'Score: ' + score;
}
