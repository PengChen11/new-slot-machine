'use strict';

//imagePool array for holding all gameImage Objects
var imagePool = [];

//construction function to create image objects
function gameImage (name, imagePath, wagerMultiplier) {
  this.name = name;
  this.imagePath = imagePath;
  this.wagerMultiplier = wagerMultiplier;
  imagePool.push(this);
}

//creating gameImage Objects using constructor
new gameImage('cherry', 'assets/cherry.png', 5);
new gameImage('seven', 'assets/seven.png', 10);
new gameImage('gold', 'assets/gold.png', 15);
console.log(imagePool);

//creating variables to access img tags in html
//double check id's when design team has created these elements on index.html
var getImage1 = document.getElementById('img1');
var getImage2 = document.getElementById('img2');
var getImage3 = document.getElementById('img3');


//function to generate random images

//function to determinte the value of new random images
//if a win multiply against wager amount if loss then deducted from credit balance


//function to grab value from wager button and start the game function

//click handler for handling when a water is clicked

//add listener to html elements for click handler
//add these to the button wagers

