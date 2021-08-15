// GUI Assignment: HW5: Implementing a Bit of  Scrabble with Drag-and-Drop
// Name: Nicholas Aswani, UMass Lowell Computer Science, nicholas_aswani@student.uml.edu
// Aug 7th, 2021

In this Assignment we were tasked with implementing a Bit of Scrabble  with Drag-and-Drop using 
jQuery UI .
I implemented  a oneline scrabble board with letter tiles on  a rack. In my implementation the user 
can drag tiles to the board to make a word and a score is calculated. The board has two double word 
squares. 

For the games logic i created variables needed for the game and functions to keep the score, 
replenish and initialize the rack. For the data structure for the actual letter distribution constructed
my own array of associated values that i could implement with my own way. I was not able to use the provided 
associative array or the json data structure.

Fully Working features: 
-tiles are selected randomly from the data structure 
-the board has bonus squares 
-the board can be cleared for a new game with new game button
-tiles once dragged to board they cannot be moved
-the score is kept until new game
-The user can restart the game; theres a button to deal a new set of seven random tiles

Currently working features: 
-Drag and drop features is working although not perfectly. At certain times the squares slide a bit out
 outside their boxes.

Partially working:
-Multiple graphic sources is not fully implemented as described in the assignment.

Features not implmented:
-full implementation of the scrabble board was not attempted in this exercise.
-word validation was also not implemented in this exercise.
