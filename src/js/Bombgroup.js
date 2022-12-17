import Bomb from './Bomb';
export default class Bombgroup {
    constructor(difficulty) {
        this.bombs = [];
        this.difficulty = difficulty;
        this.settings = BOOM.bombsettings(difficulty);
        this.finished = false;

        // adjust settings for difficulty

        //console.log(this.settings);
        //Fyll opp gruppen med bomber
        var firework;
        for (var i = 0; i < this.settings.count; i++) {
            firework = new Bomb(this.settings);
            this.bombs.push(firework);
        }
    }

    done() {
        if (!this.finished) {
            this.finished = true;
            BOOM.currentLevel.score += this.settings.points;
            BOOM.currentLevel.scoreDisplay.setScore(this.settings.points);
        }
    }

    move() {
        this.bombs.forEach(function(bomb, index) {
            bomb.move(0, 1);
        });
    }
}
