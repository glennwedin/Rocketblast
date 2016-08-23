export default RandomProbability {
	constructor () {
		this.weights = [0.1, 0.1, 0.1, 0.9]; // probabilities
		this.results = [1, 2, 3, 4]; // values to return
	}

	getRandom () {
	    var num = Math.random(),
	        s = 0,
	        i = 0,
	        lastIndex = this.weights.length - 1;

	    for (i = 0; i < lastIndex; ++i) {
	        s += this.weights[i];
	        if (num < s) {
	            return this.results[i];
	        }
	    }
	    return this.results[lastIndex];
	}

}