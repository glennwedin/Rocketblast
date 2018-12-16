export default class ScoreDisplay {
    constructor() {
        this.opacity = 0;
        this.score = 0;
        this.timeout = null;
    }

    setScore(score) {
        if (score !== 0) {
            clearTimeout(this.timeout);

            const th = this;
            this.opacity = 0;
            this.score = score;
            this.timeout = setTimeout(function() {
                th.score = 0;
                th.opacity = 0;
            }, 1000);
        }
    }

    draw() {
        if (this.score !== 0) {
            if (this.opacity <= 1.0) {
                this.opacity += 0.1;
            }
            var c = BOOM.canvas.ctx;
            c.font = '100px arial';
            c.fillText(this.score, 200, 200);
            c.fillStyle = 'rgba(240,238,59,' + this.opacity + ')';
        }
    }
}
