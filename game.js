"use strict";


class Game {
	constructor(wordArray) {
		this.wordArray = wordArray;
		
	}

 	pickRandomWord() {
		return this.wordArray[Math.floor(Math.random() * this.wordArray.length + 1) - 1];
	}
}

module.exports = Game;
