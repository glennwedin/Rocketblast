export default class ScoreDisplay {
	constructor () {
		this.opacity = 0;
		this.score = 0;
	}

	setScore (score) {
		if(score !== 0) {
			this.opacity = 0;
			this.score = score;
		}
	}

	draw () {
		if(this.score !== 0) {
			if(this.opacity <= 1.00) {
				this.opacity += 0.05;
			}
			var c = BOOM.canvas.ctx;
				c.font = "100px arial";
				c.fillText(this.score, 200, 200);
				c.fillStyle = "rgba(240,238,59,"+this.opacity+")";

			var th = this;
			setTimeout(function ()  {
				th.score = 0;
			},1000);
		}
	}
}