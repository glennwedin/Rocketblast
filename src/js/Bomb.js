import Particle from "./Particle";

export default class Bomb {
	constructor (settings) {
		this.pos = {
			x: BOOM.utils.randomX(),
			y: -50
		};
		this.particles = [];
		this.settings = settings;
		this.isHit = false;
		this.isMissed = false;
		this.gravity = settings.gravity * (Math.floor(Math.random() * 3) + 1 );
		this.isGone = false;
	}

	hit () {
		var th = this;
		if(!th.isHit) {
			th.isHit = true;
			th.color = 'pink';

			BOOM.audio.effects.hit.currentTime = 0;
			BOOM.audio.effects.hit.play();
			
			//If damage when hitting
			if((BOOM.currentLevel.life + this.settings.hitdamage) >= BOOM.currentLevel.lifemax) {
				BOOM.currentLevel.life = BOOM.currentLevel.lifemax;
			} else {
				BOOM.currentLevel.life += this.settings.hitdamage;
			}

			//Create its particles
			th.explode();
			setTimeout(function () {
				th.isGone = true;
			}, 1000);
		}
	}

	move (x, y) {
		var context = BOOM.canvas.ctx;

		this.pos.x += x;
		this.pos.y += y*this.gravity;

		//Dersom den ikke er truffet og ikke allerede er telt OG den er utenfor
		if(!this.isMissed && !this.isHit && this.pos.y >= BOOM.settings.height) {
			this.isMissed = true;
			BOOM.currentLevel.life += this.settings.missdamage;

		}

		if(this.isHit) {
			//Update explosion particles position
			if(!this.isGone) {
				var p = null,
				particlesLength = this.particles.length;
				while(particlesLength--) {
					p = this.particles[particlesLength];
					p.update();
					p.render();
				}
			}
			//Beveg nedover
		} else {
			context.beginPath();
			if(this.settings.image) {
				context.drawImage(this.settings.image, this.pos.x, this.pos.y, this.settings.width, this.settings.height);

				//Hitbox debug
				//context.strokeRect(this.pos.x, this.pos.y, this.settings.width, this.settings.height);
			} else {
				context.rect(this.pos.x, this.pos.y, this.settings.width, this.settings.height);
				context.fillStyle = this.settings.color;
				context.fill();
			}
			context.closePath();
			context.restore();
		}
	}

	explode () {
		var th = this;
		//for (var i = 0; i < 10; i++) {

		var i = 50; //Antallet partikler i en eksplosjon
		while(i--) {
		    var particle = new Particle(this.pos);
		    var angle = Math.random() * Math.PI * 2;

		        // emulate 3D effect by using cosine and put more particles in the middle
		    var speed = Math.cos(Math.random() * Math.PI / 2) * 15;

		    particle.vel.x = Math.cos(angle) * speed;
		    particle.vel.y = Math.sin(angle) * speed;

		    particle.size = 8;
		    particle.gravity = 0.2;
		    particle.resistance = 0.92;
		    particle.shrink = Math.random() * 0.05 + 0.93;

			particle.flick = true;
		    particle.color = Math.floor(Math.random() * 360 / 10) * 10;

		    var index = this.particles.push(particle);

		    setTimeout(function () {
		    	th.particles.splice(index, 0);
		    }, 300);
		}
	}
}