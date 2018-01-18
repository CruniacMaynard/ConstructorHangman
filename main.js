
var Game = require('./game.js');

var Word = require('./word.js');



var inquirer = require('inquirer');
var colors = require('colors');


var border = "";
var blanks = "";
var userGuess;
var guessesLeft = 10;
var lettersGuessed = [];
var wins = 0;
var losses = 0;


var WORDARRAY = ["cavs", "browns", "indians", "halloffame", "rocknroll", "towercity", "keytower"];


var game = new Game(WORDARRAY);

var generatedWord = game.pickRandomWord();

 
var word = new Word(generatedWord);


var index = WORDARRAY.indexOf(generatedWord);

function printInfo() {
    console.log('\033c');
    console.log("\nWelcome to terminal hangman!\n".bold.red + "\nToday's catagory is " + "Cleveland General Topics".rainbow + "\n");
    console.log("\n***********************************************".green);
    console.log("|                                             |".green);
    console.log("|".green + "  You current word: ".red + word.displayWord().magenta);
    console.log("|                                             |".green);
    console.log("***********************************************".green + "\n");
    console.log("Guesses remaining: ".blue + guessesLeft + " | " + "Letters Guessed: ".blue + lettersGuessed.join(" ").rainbow + "\n");
    console.log("Wins: ".green + wins + " | " + "Losses: ".yellow + losses + "\n");
}


function gameReset() {

    index = "";
    game = new Game(WORDARRAY);
    generatedWord = game.pickRandomWord();
    word = new Word(generatedWord);
    index = WORDARRAY.indexOf(generatedWord);
    lettersGuessed = [];
    guessesLeft = 10; 
    printInfo();
    guess();

}


function correctWord() {
   
    if (word.roundFinished()) {
       
        if (index != -1) {
            WORDARRAY.splice(index, 1);
        }
        
        if (WORDARRAY.length === 0) {
            console.log("\nCongrats you guessed all of the words, GAME OVER!\n".rainbow);
            return;
        }
        wins += 1;
        
        inquirer.prompt([{
            name: "replay",
            message: "Nice work! You guessed the word, play again (Y/N)",
            type: "input",
            validate: function(input) {
                if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
                    return true;
                } else {
                    return false;
                }
            }
        }]).then(function(answers) {
            if (answers.replay === 'Y' || answers.replay === 'y') {
                
                gameReset();

            } else {
            	
                console.log("Thank you for playing. Good Bye!".magenta);
            }
        });
        return;

    }
    guess();
}


function incorrectWord() {
    losses += 1;
    inquirer.prompt([{
        name: "playagain",
        message: "You have no more guesses, play again (Y/N)",
        type: "input",
        validate: function(input) {
            if (input === 'Y' || input === 'y' || input === 'n' || input === 'N') {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answers) {
        if (answers.playagain === 'Y' || answers.playagain === 'y') {
        
            gameReset();

        } else {

            console.log("Thanks for playing. Good Bye!".magenta);
        }
    });

}


printInfo();

function guess() {

   
    inquirer.prompt([{
        name: "guess",
        message: "Guess a letter",
        type: "input",
        validate: function(input) {
            if (input.match(/[A-Za-z]+/)) {
                return true;
            } else {
                return false;
            }
        }
    }]).then(function(answers) {
        userGuess = answers.guess;
        if (guessesLeft > 1) {
           
            word.playerGuess(userGuess);
     
            if (lettersGuessed.indexOf(userGuess) === -1) {
                lettersGuessed.push(userGuess);
                guessesLeft -= 1;
            }
            printInfo();
            correctWord();

        } else {
            
            incorrectWord();

        }

    });

}
guess();