'use strict';

//imagePool array for holding all gameImage Objects
var imagePool = [];
var credits = 100;
var winningResult = 0;

//construction function to create image objects
function GameImage (name, imagePath, wagerMultiplier) {
  this.name = name;
  this.imagePath = imagePath;
  this.wagerMultiplier = wagerMultiplier;
  imagePool.push(this);
}

//creating gameImage Objects using constructor
new GameImage('cherry', 'assets/cherry.png', 5);
// new GameImage('bananas', 'assets/bananas.png', 5);
// new GameImage('carrot', 'assets/carrot.png', 5);
// new GameImage('lemon', 'assets/lemon.png', 5);
new GameImage('seven', 'assets/seven.png', 10);
// new GameImage('orange', 'assets/orange.jpg', 10);
new GameImage('gold', 'assets/gold.png', 15);

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
  var getStatusBox = document.getElementById('status-winningRound');
  var createParagraph = document.createElement('p');

  //clear previous data and adds new content to P tag
  getCredit.innerHTML = null;
  getStatusBox.innerHTML = null;

  if (credits > 0 && credits < 1000) {
    createParagraph.innerHTML = '$' + credits;
    //adds new message to paragraph and appends to document
    getCredit.appendChild(createParagraph);
  } else if (credits >= 1000) {
    createParagraph.innerHTML = '$' + credits;
    //adds new message to paragraph and appends to document
    getCredit.appendChild(createParagraph);
    alert('You have won by reaching more than $1000!');
  } else {
    credits = 0;
    createParagraph.innerHTML = '$' + credits;
    getCredit.appendChild(createParagraph);
    alert('You ran out of money!');
  }
}

//function updates status box
function statusUpdate(status) {
  var getStatusBox = document.getElementById('status-winningRound');
  var createParagraph = document.createElement('p');
  getStatusBox.innerHTML = null;

  createParagraph.innerHTML = 'You have won $' + status + '!';
  getStatusBox.appendChild(createParagraph);
}



function calculateEarnings(wager) {
  //grab the new images that were generated
  var getImage1 = document.getElementById('img1');
  var getImage2 = document.getElementById('img2');
  var getImage3 = document.getElementById('img3');
  var getStatusBox = document.getElementById('status-winningRound');

  //compares image one and image two for a match
  if (getImage1.name === getImage2.name) {
    //if 1 and 2 match compare image 2 and image 3 for a match
    if (getImage2.name === getImage3.name) {
      //if all three match, create a varable that is equal to the name of the matched type
      var matchOfThree = getImage1.name;
      //Take the name and run it through the imagePool array
      for (var i in imagePool) {
        //Compares imagePool names compared to matched name
        if (imagePool[i].name === matchOfThree) {
          //when a match is found create a winningResult variable which is wager * wagerMultiplier
          var winningResult = (imagePool[i].wagerMultiplier * wager);
          //add winningResults to global varaible credits and run creditUpdate
          credits += winningResult;
          creditUpdate();
          statusUpdate(winningResult);
        }
      }
    } else { //this happens when 1 and 2 match but 2 and 3 do not match
      //create removeWager that turns wager amount negative
      var removeWager = wager * -1;
      //add removeWager to global variable credits and runs creditUpdate.
      getStatusBox.innerHTML = null;
      credits += removeWager;
      creditUpdate();
    }
  } else { //if image one and two do not match
    //create removeWager that turns wager amount negative
    // eslint-disable-next-line no-redeclare
    var removeWager = wager * -1;
    //add removeWager to global variable credits and runs creditUpdate.
    getStatusBox.innerHTML = null;
    credits += removeWager;
    creditUpdate();
  }
}

//click handler for handling when a wager button is clicked
function clickHandler(event) {
  console.log('clicked');
  var wager = event.target.value;
  renderGameImage();
  calculateEarnings(wager);
}

//add listener to html elements for click handler
//add these to the button wagers
getWager1.addEventListener('click', clickHandler);
getWager5.addEventListener('click', clickHandler);
getWager10.addEventListener('click', clickHandler);

//this is ran on page load to generate the first 3 images
renderGameImage();
