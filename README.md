# Mastermind
An online version of the classic code-breaking game.
## Overview
This game was built using HTML, CSS, JavaScript, and jQuery. It is an online version of the game known as Mastermind. In the game, the player guesses at a randomly chosen secret color code until he/she either is correct, and wins, or makes 12 guesses, and loses. During each turn, the player receives feedback on how similar the guess was to the secret code.

## Instructions
At the beginning of the game, the computer selects a random series, or "code," for four colors. The available colors are red, orange, yellow, green, blue, and black. The code is not visible to the player. After this, the player must guess the series. Each guess requires four colors, which can be selected by clicking the buttons on the left in the desired order. The colors are displayed in the current row on the board, with the rows being filled in top to bottom order. After each guess, the computer fills in the smaller boxes on the left with colors giving feedback. For each color in the guess that is the correct color in the correct position, a red box appears. For each color that is in the wrong position, a white box is added. A single colored box in the guess cannot correspond to more than one colored box in the feedback. Once all colors are correct and in the correct position, the player wins. If the player has not guessed the code correctly after 12 guesses, the player loses. After the game is over, the secret row is displayed above all the player's guesses.

## Technical approach taken
The cells are generated dynamically using jQuery. The buttons update the DOM using AJAX. State is entirely stored in the DOM, and is set and accessed using jQuery. The secret row is randomly generated using the Math.random function in JavaScript.

## Link to game
https://abepolk.github.io/mastermind/

## Trivia
Donald Knuth, an expert in theoretical computer science, demonstrated that the game could always be solved within five guesses using a minimax algorithm. Minimax is widely used in AI and decision theory (Wikipidia, "Mastermind"; Wikipedia, "Minimax").