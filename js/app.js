'use strict';

//imagePool array for holding all gameImage Objects
var imagePool = [];
var credits = 100;
var wager = 0;

//construction function to create image objects
function GameImage (name, imagePath, wagerMultiplier) {
  this.name = name;
  this.imagePath = imagePath;
  this.wagerMultiplier = wagerMultiplier;
  imagePool.push(this);
}

//creating gameImage Objects using constructor
new GameImage('cherry', 'assets/cherry.png', 5);
new GameImage('seven', 'assets/seven.png', 10);
new GameImage('gold', 'assets/gold.png', 15);
console.log(imagePool);

//creating variables to access img tags in html
//double check id's when design team has created these elements on index.html
var getImage1 = document.getElementById('img1');
var getImage2 = document.getElementById('img2');
var getImage3 = document.getElementById('img3');
//creating variables to access wager buttons in html
var getWager1 = document.getElementById('bet1');
var getWager5 = document.getElementById('bet5');
var getWager10 = document.getElementById('bet10');

//function to generate random image based on on imagePool
function randomImageGenerator() {
  var i = Math.floor(Math.random() * imagePool.length);
  return imagePool[i];
}

//function to render new images on to the page.
function renderGameImage() {

  var newImage1 = randomImageGenerator();

  getImage1.src = newImage1.imagePath;
  getImage1.name = newImage1.name;

  var newImage2 = randomImageGenerator();

  getImage2.src = newImage2.imagePath;
  getImage2.name = newImage2.name;

  var newImage3 = randomImageGenerator();

  getImage3.src = newImage3.imagePath;
  getImage3.name = newImage3.name;

}

//function to update credit balance
function creditUpdate() {

  //variable to access credit element in html and create a <p> tag
  var getCredit = document.getElementById('status-dollar');
  var createParagraph = document.createElement('p');

  //clear previous data and adds new content to P tag
  getCredit.innerHTML = null;
  createParagraph.innerHTML = '$' + credits;
  //adds new message to paragraph and appends to document
  getCredit.appendChild(createParagraph);
}


















//click handler for handling when a water is clicked
function clickHandler(event) {
  wager = event.target.value;

  console.log(wager);
  renderGameImage();
}

//add listener to html elements for click handler
//add these to the button wagers
getWager1.addEventListener('click', clickHandler);
getWager5.addEventListener('click', clickHandler);
getWager10.addEventListener('click', clickHandler);


