export default class Player {
	constructor () {
		var th = this;
		//Hent info fra server
		BOOM.utils.readFile('../config/player.json', function (json) {
			json = JSON.parse(json);
			th.playerSettings = json;
		});
	}

	getCurrentLevel () {
		return this.playerSettings.atLevel;
	}
}