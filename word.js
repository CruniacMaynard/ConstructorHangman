"use strict";

const Letter = require('./letter.js');



class Word {
    constructor(value) {
    	
        this.value = value;
       
        this.letters = value
            .split("")
            .map(v => new Letter(v));
    }
    displayWord() {
       
        var word = this.letters
            .map(v => v.show()).join("");
      return word;
    }

	
    playerGuess(guess) {
        this.letters.map(function(letter) {
            if (guess === letter.value) {
                letter.visible = true;
                return true;
            } else {
                return false;
            }
        })
        .some(function(v) {
            return v;

        })
    }
	
    roundFinished() {
    	return this.displayWord() === this.value;
	
	}


}
module.exports = Word;
