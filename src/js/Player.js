import player from '../../config/player.json';
export default class Player {
    constructor() {
        var th = this;

        if (!window.localStorage.getItem('playersettings')) {
            window.localStorage.setItem(
                'playersettings',
                JSON.stringify(player)
            );
        }
        th.playerSettings = JSON.parse(
            window.localStorage.getItem('playersettings')
        );
    }

    getCurrentLevel() {
        return this.playerSettings.atLevel;
    }

    increaseLevel() {
        this.playerSettings.atLevel += 1;
        this.savePlayerInfo();
    }

    savePlayerInfo() {
        if (window.localStorage.getItem('playersettings')) {
            window.localStorage.setItem(
                'playersettings',
                JSON.stringify(this.playerSettings)
            );
            return true;
        }
        throw new Error('No playersettings available');
    }
}
