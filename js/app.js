'use strict';
/***** GLOBAL VARIABLES *****/
//imagePool array for holding all gameImage Objects
var imagePool = [];
//Starting credit amount for the game
var credits = 100;
// //creating variables to access wager buttons in html
var getWager1 = document.getElementById('bet1');
var getWager5 = document.getElementById('bet5');
var getWager10 = document.getElementById('bet10');

//construction function to create image objects
function GameImage (name, imagePath, wagerMultiplier, matchOftwoMultiplier) {
  this.name = name;
  this.imagePath = imagePath;
  this.wagerMultiplier = wagerMultiplier;
  this.matchOftwoMultiplier = matchOftwoMultiplier;
  imagePool.push(this);
}

//creating gameImage Objects using constructor
new GameImage('cherry', 'assets/cherry.png', 5, 2);
new GameImage('bananas', 'assets/bananas.png', 5, 2);
new GameImage('carrot', 'assets/carrot.png', 5, 2);
new GameImage('lemon', 'assets/lemon.png', 5, 2);
new GameImage('seven', 'assets/seven.png', 10, 3);
new GameImage('gold', 'assets/gold.png', 15, 5);

//function to update credit balance for a win
function creditUpdate() {

  //variable to access credit element in html and create a <p> tag
  var getCredit = document.getElementById('status-dollar');
  var getStatusBox = document.getElementById('status-winningRound');
  var createParagraph = document.createElement('p');

  //clear previous data and adds new content to P tag
  getCredit.innerHTML = null;
  getStatusBox.innerHTML = null;
  //conditional logic to determine the balance of credits
  if (credits > 0 && credits < 1000) {
    createParagraph.innerHTML = ' $' + credits;
    //adds new message to paragraph and appends to document
    getCredit.appendChild(createParagraph);
  } else if (credits >= 1000) {
    createParagraph.innerHTML = ' $' + credits;
    //adds new message to paragraph and appends to document
    getCredit.appendChild(createParagraph);
    alert('You have won by reaching more than $1000!');
  } else {
    credits = 0;
    createParagraph.innerHTML = ' $' + credits;
    getCredit.appendChild(createParagraph);
    alert('You ran out of money!');
  }
}
//function update credit balance for a loss
function creditUpdateLoss(wager) {
  var removeWager = wager * -1;
  credits += removeWager;
  creditUpdate();
}

//function updates status box
function statusUpdate(status) {
  //variables to access status box element in html
  var getStatusBox = document.getElementById('status-winningRound');
  var createParagraph = document.createElement('p');
  getStatusBox.innerHTML = null;
  //adds new message to the paragraph and appends to document
  createParagraph.innerHTML = 'You have won $ ' + status + '!';
  getStatusBox.appendChild(createParagraph);
}

//function to calculate how much creadit you've earned/lost per spin
function calculateEarnings(wager) {
  //The output from the spinning wheel is no longer a img. It is a tag class for the div that holds the ring.
  // spin-1 = carrot, spin-2 = lemon, spin-3 = seven, spin-4 = gold, spin-5 = cherry, spin-6 = bananas;

  // since it has two class attr, we need to slice 5 to get the spin-#;
  var img1 = document.getElementById('ring1').classList.value.slice(5);
  var img2 = document.getElementById('ring2').classList.value.slice(5);
  var img3 = document.getElementById('ring3').classList.value.slice(5);

  // since we are checking the class tags, we will need to associate that with an image name in the imagePool
  // Takes above variables and passing them through getName function on spinner.js to get a string name value of the image.
  // eslint-disable-next-line no-undef
  var getImage1 = getName(img1);
  // eslint-disable-next-line no-undef
  var getImage2 = getName(img2);
  // eslint-disable-next-line no-undef
  var getImage3 = getName(img3);

  //*** WIN CONDITIONS ***/
  //THREE OF A KIND WIN CONDITION
  if (getImage1 === getImage2 && getImage1 === getImage3) {
    //if all three match, create a varable that is equal to the name of the matched type
    var matchOfThree = getImage1;
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
  } else if ( //two of a kind match in a row
    getImage1 === getImage2 && getImage1 !== getImage3 ||
      getImage2 === getImage3 && getImage2 !== getImage1) {
    //if there is a match of two in a row, 1st and 2nd or 2nd and 3rd pictures
    var matchOfTwo = getImage2;
    console.log(getImage2);
    if (matchOfTwo === 'gold' || matchOfTwo === 'seven') {
      // eslint-disable-next-line no-redeclare
      for (var i in imagePool) {
        //Compares imagePool names compared to matched name
        if (imagePool[i].name === matchOfTwo) {
          //when a match is found create a winningResult variable which is wager * wagerMultiplier
          // eslint-disable-next-line no-redeclare
          var winningResult = (imagePool[i].matchOftwoMultiplier * wager);
          console.log(winningResult);
          //add winningResults to global varaible credits and run creditUpdate
          credits += winningResult;
          creditUpdate();
          statusUpdate(winningResult);
        }
      }
    } else { //You lost, take the wager make it a negative value then add to credits and run creditUpdate
      creditUpdateLoss(wager);
    }
  } else if ( //two of a kind match img 1 and img 3
    getImage1 === getImage3 && getImage1 !== getImage2) {
    //if there is a match of two in a row, 1st and 2nd or 2nd and 3rd pictures
    // eslint-disable-next-line no-redeclare
    var matchOfTwo = getImage1;
    if (matchOfTwo === 'gold' || matchOfTwo === 'seven') {
      // eslint-disable-next-line no-redeclare
      for (var i in imagePool) {
        //Compares imagePool names compared to matched name
        if (imagePool[i].name === matchOfTwo) {
          //when a match is found create a winningResult variable which is wager * wagerMultiplier
          // eslint-disable-next-line no-redeclare
          var winningResult = (imagePool[i].matchOftwoMultiplier * wager);
          //add winningResults to global varaible credits and run creditUpdate
          credits += winningResult;
          creditUpdate();
          statusUpdate(winningResult);
        }
      }
    } else { //You lost, take the wager make it a negative value then add to credits and run creditUpdate
      // eslint-disable-next-line no-redeclare
      creditUpdateLoss(wager);
    }
  } else {//if there are no matches at all this runs
    creditUpdateLoss(wager);
  }
}

//click handler for handling when a wager button is clicked
function clickHandler(event) {
  //start function is on spinner.js which starts the spinning of the reels
  start();
  var wager = event.target.value;
  // since start function will spin the wheels 3.5s, we set a delay timer for 3.6s so the result won't pop up before the wheel stops.
  setTimeout(function (){
    calculateEarnings(wager);
  }, 3600);
}

//add listener to html elements for click handler
//add these to the button wagers
getWager1.addEventListener('click', clickHandler);
getWager5.addEventListener('click', clickHandler);
getWager10.addEventListener('click', clickHandler);
