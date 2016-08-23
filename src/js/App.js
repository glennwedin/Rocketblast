window.BOOM = {};

"use strict";

/*
BOOM.settings = {
	width: 0,
	height: 0,
	currentTime: 0
}

BOOM.user = {
	score: 0
}

BOOM.utils = {
	randomX: function () {
		var x = Math.round(Math.random() * BOOM.settings.width);
		if(x > 50) {
			x = x-25;
		}
		return x;
	},
	timestamp: function () {
		return window.performance.now();
	},
	readFile: function (file, callback) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", file, true);
		xhr.onreadystatechange = function () {
			if(xhr.readyState === 4 && xhr.status === 200) {
				var result = xhr.responseText;
				if(result) {
					callback(result);
				}	
			}
		};
		xhr.send();
		
	}
}


BOOM.audio = {
	effects: {
		hit: new Audio('sounds/hit.m4a')
	}
}

*/

/*
*	Type bombe som blir sluppet. gir ikke mening ifbm difficulty
*/
/*
BOOM.bombsettings = function (difficulty) {
	//Farge, tyngde og poengsum pr vanskelighetsgrad
	switch(difficulty) {
		case 1:
			return {
				color: 'red',
				image: BOOM.gfx.red_rocket,
				width: 30,
				height: 50,
				gravity: 2,
				points: 10,
				count: 3,
				missdamage: -5,
				hitdamage: 0
			}
		break;
		case 2:
			return {
				color: '#0FF0FF',
				image: BOOM.gfx.blue_rocket,
				width: 30,
				height: 50,
				gravity: 2,
				points: 20,
				count: 4,
				missdamage: -8,
				hitdamage: 0
			}
		break;
		case 3:
			return {
				color: 'green',
				image: BOOM.gfx.green_rocket,
				width: 30,
				height: 50,
				gravity: 3,
				points: 30,
				count: 5,
				missdamage: -10,
				hitdamage: 0
			}
		break;
		case 4: //bombe som gir straffepoeng om man treffer den
			return {
				color: 'black',
				image: BOOM.gfx.bomb_1,
				width: 50,
				height: 50,
				gravity: 4,
				points: -30,
				count: 1,
				missdamage: 0,
				hitdamage: -50
			}
		break;
		case 5: //bombe som gir straffepoeng om man treffer den
			return {
				color: 'green',
				image: BOOM.gfx.healthcrate,
				width: 50,
				height: 50,
				gravity: 4,
				points: 0,
				count: 1,
				missdamage: 0,
				hitdamage: 30
			}
		break;
	}
}
*/


//TODO: Funksjon som sjekker posisjonen til alle bombene hvert sekund for å se hvilke som er tapt
/*
BOOM.canvas = {
	canvas: null,
	effectsCanvas: null,

	ctx: null,
	effectsCtx: null,

	clearContext: function () {
		BOOM.canvas.ctx.clearRect(0, 0, BOOM.settings.width, BOOM.settings.height);
	}
}

//Gameloop
BOOM.main = function (t) {
	BOOM.canvas.clearContext();
	BOOM.currentLevel.draw();
	window.requestAnimationFrame(BOOM.main);
}
*/

//Bootstrap
import Game from "./Game";
//import Level from "./Level";
//console.log(Game.main());
window.onload = function () {

	
	window.BOOM = Game;
	BOOM.init();
	//window.BOOM = new Game();
	/*
	BOOM.gfx = new Gfx();

	BOOM.settings.width = window.innerWidth;
	BOOM.settings.height = window.innerHeight;

	BOOM.canvas.canvas = document.getElementById('gamecanvas');
	BOOM.canvas.canvas.width = BOOM.settings.width;
	BOOM.canvas.canvas.height = BOOM.settings.height;
	BOOM.canvas.ctx = BOOM.canvas.canvas.getContext('2d');
	BOOM.canvas.ctx.strokeStyle = "#FFFFFF";
	
	//Initiate game with a level
	BOOM.utils.readFile('../config/gamesettings.json', function (json) {
		var gamesettings = JSON.parse(json);

		BOOM.currentLevel = new Level(gamesettings);

		BOOM.currentLevel.dialog({
			'title': 'Get ready!',
			'text': 'Spela på.',
			'action_yes': 'Go',
			'action_no': 'I\'m a coward',
			'action_next': null,
			'action_previous': null
		}, function () {
			BOOM.currentLevel.start();
			BOOM.main();
		});
		
		//When a level is completed save user stats
		
	});
*/

	
}