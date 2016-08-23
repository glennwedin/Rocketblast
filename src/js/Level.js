import Bombgroup from "./Bombgroup";
import ScoreDisplay from "./ScoreDisplay";
import {dialog} from "./Dialog";

export default class Level {
	constructor(levelsettings) {
		var currentSettings = levelsettings.levels['level_'+BOOM.player.getCurrentLevel()];

		this.starttime = 0;
		this.time = currentSettings.time*1000; //30sekunder
		this.lifemax = 100;
		this.life = 100; //100%
		this.score = 0;
		this.minimumscore = currentSettings.score;
		this.done = false;
		this.bombgroups = [];
		this.scoreDisplay = new ScoreDisplay;
		this.dialog = dialog;

		this.hud = {
			score: document.getElementById('score'),
			time: document.getElementById('timer'),
			life: document.getElementById('lifebarfill')
		}

		//Setup of touchevents
		this.touching = false;
		this.touches = { x: [], y: [] };

		var c = BOOM.canvas.canvas,
		th = this;
		c.addEventListener('touchstart', function (e) {
			th.touching = true;
			th.touches.x.push(e.touches[0].clientX);
			th.touches.y.push(e.touches[0].clientY);

		}, false);
		c.addEventListener('touchmove', function (e) {
			if(th.touching) {
				th.touches.x.push(e.touches[0].clientX);
				th.touches.y.push(e.touches[0].clientY);
			}
		}, false);
		c.addEventListener('touchend', function () {
			th.touching = false;
			th.touches = { x: [], y: [] };
		}, false);

		//Prevent bungee effect on ipad
		c.addEventListener('touchmove', function (e) {
			e.preventDefault();
		}, false);
		//EVENTS END
	}

	start () {
		BOOM.audio.effects.hit.play();
		BOOM.audio.effects.hit.pause();
		this.starttime = BOOM.utils.timestamp();
		console.log(BOOM.utils.timestamp());
		this.updateHud();
		//INIT GAME WITH GIVEN SETTINGS
		//Denne MÅ ikke gå når main ikke kjøres :P
		var th = this,
			group = new Bombgroup(Math.floor(Math.random() * 5) + 1 );
			th.bombgroups.push(group);
		this.interval = setInterval(function () {
			//Vanskelighetsgrader
			//	Level 1: 1-2 = Math.floor(Math.random() * 2) + 1  
			// 	Level 2: 1-3 = Math.floor(Math.random() * 3) + 1  
			var group = new Bombgroup(Math.floor(Math.random() * 5) + 1 );
			th.bombgroups.push(group);
		}, 1500);
	}

	stop () {
		clearInterval(this.interval);
	}

	timeout () {
		//Sjekk om score er fullført
		// :)
		if(this.score >= this.minimumscore) {
			this.dialog({
				'title': 'VICTORY - '+this.score,
				'text': 'Wohoo',
				'action_yes': 'Yes',
				'action_no': 'No',
				'action_next': null,
				'action_previous': null
			}, function () {
				th.stop();
				//Call on game object to create a new level
			});
		} else {
			this.dialog({
				'title': 'FAILED!!',
				'text': 'You failed...',
				'action_yes': 'Yes',
				'action_no': 'No',
				'action_next': null,
				'action_previous': null
			}, function () {
				th.stop();
				//Call on game object to create a new level
			});
		}

		//Hvis ikke 
		// :(

	}

	updateHud () {
		var currentTime = BOOM.utils.timestamp() - this.starttime,
		th = this;
	
		if(this.time <= currentTime) {
			this.done = true;
			this.timeout();
			/*
			this.dialog({
				'title': 'VICTORY - '+this.score,
				'text': 'Wohoo',
				'action_yes': 'Yes',
				'action_no': 'No',
				'action_next': null,
				'action_previous': null
			}, function () {
				th.stop();
				//Call on game object to create a new level
			});
			*/
			//th.stop();
		}
		if(this.life <= 0) {
			this.life = 0;
			this.hud.life.style.height = this.life+'%';
			this.done = true;
			
			this.dialog({
				'title': 'Time ran out!!!',
				'text': 'You failed us.',
				'action_yes': 'Yes',
				'action_no': 'No',
				'action_next': null,
				'action_previous': null
			}, function () {
				th.stop();
			});
			//alert('FY FAEN DU SUGER!!!!')
		}

		//Dette er veldig intenst for CPU - bør gjøres i canvas istedet for DOM
		this.hud.time.innerHTML = Math.ceil((this.time - currentTime)/1000);
		this.hud.score.innerHTML = this.score+' / '+this.minimumscore;
		this.hud.life.style.height = this.life+'%';
	}

	draw() {

		if(this.done) {
			//Vis dialog med poengscore og mulighet til å gå videre
			return;
		}
		//TIMER
		this.updateHud();

		//Scoredisplay
		this.scoreDisplay.draw();

		////BOMBGROUP
		//For hver bombegruppe
		var i = 0, 
			th = this;
		for(i = 0; th.bombgroups.length > i; i++) {
			th.bombgroups[i].move();
		}

		//Sjekk om touch har truffet et av bombene
		if(th.touching) {
			//Dette bør flyttes inn i egen funksjon
			th.bombgroups.forEach(function (bombgroup, index) {
				//Sjekk om alle bombene har hits
				var count = 0;

				bombgroup.bombs.forEach(function (bomb, index) {
					if(bomb.isHit) {
						count += 1;
					}
					if(!bombgroup.finished && count >= bombgroup.bombs.length) {
						//bombgroup.done = true;
						bombgroup.done();
					}
				});

				bombgroup.bombs.forEach(function (bomb, index) {
				//	console.log(bomb.pos.x);
					if(bomb.pos.x < th.touches.x[th.touches.x.length-1]+bomb.settings.width
					&& bomb.pos.x > th.touches.x[th.touches.x.length-1]-bomb.settings.width
					&& bomb.pos.y < th.touches.y[th.touches.y.length-1]+bomb.settings.height
					&& bomb.pos.y > th.touches.y[th.touches.y.length-1]-bomb.settings.height) {
						bomb.hit();
					}
					
				});
			});
		}
	}
	
};


