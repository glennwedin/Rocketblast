import Gfx from "./Gfx";
import Level from "./Level";
import Player from "./Player";

var game;
export default game = {
	
	currentLevel: null,

	bombsettings: function (difficulty) {
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
	},

	settings: {
		width: null,
		height: null,
		currentTime: null
	},

	audio: {
		effects: {
			hit: new Audio('sounds/hit.m4a')
		}
	},

	canvas: {
		canvas: null,
		effectsCanvas: null,

		ctx: null,
		effectsCtx: null,

		clearContext: function () {
			BOOM.canvas.ctx.clearRect(0, 0, BOOM.settings.width, BOOM.settings.height);
		}
	},

	utils: {
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
	},

	main: function () {
		var th = BOOM;
		//console.log('hei')
		th.canvas.clearContext();
		th.currentLevel.draw();
		window.requestAnimationFrame(th.main);
	},

	//new level - gjenbrukbar funksjon

	init: function () {
		var th = this;
		this.gfx = new Gfx();

		this.player = new Player();
		//fiks noe deferred greier for å sørge for at filer er lastet inn først

		this.settings.width = window.innerWidth;
		this.settings.height = window.innerHeight;

		this.canvas.canvas = document.getElementById('gamecanvas');
		this.canvas.canvas.width = this.settings.width;
		this.canvas.canvas.height = this.settings.height;
		this.canvas.ctx = this.canvas.canvas.getContext('2d');
		this.canvas.ctx.strokeStyle = "#FFFFFF";
		
		//Initiate game with a level
		this.utils.readFile('../config/gamesettings.json', function (json) {
			var gamesettings = JSON.parse(json);

			th.currentLevel = new Level(gamesettings);

			th.currentLevel.dialog({
				'title': 'Get ready!',
				'text': 'Spela på.',
				'action_yes': 'Go',
				'action_no': 'I\'m a coward',
				'action_next': null,
				'action_previous': null
			}, function () {
				th.currentLevel.start();
				th.main();
			});
			
			//When a level is completed save user stats
			
		});
	}
}
