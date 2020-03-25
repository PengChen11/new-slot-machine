/* eslint-disable indent */
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
new GameImage('bananas', 'assets/bananas.png', 5);
new GameImage('carrot', 'assets/carrot.png', 5);
new GameImage('lemon', 'assets/lemon.png', 5);
new GameImage('seven', 'assets/seven.png', 10);
// new GameImage('orange', 'assets/orange.jpg', 10);
new GameImage('gold', 'assets/gold.png', 15);

// //creating variables to access wager buttons in html
var getWager1 = document.getElementById('bet1');
var getWager5 = document.getElementById('bet5');
var getWager10 = document.getElementById('bet10');


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

//function updates status box
function statusUpdate(status) {
  var getStatusBox = document.getElementById('status-winningRound');
  var createParagraph = document.createElement('p');
  getStatusBox.innerHTML = null;

  createParagraph.innerHTML = 'You have won $ ' + status + '!';
  getStatusBox.appendChild(createParagraph);
}



function calculateEarnings(wager) {
  //The output from the spinning wheel is nolonger a img. It is a tag class for the div that holds the ring.
  // spin-1 = carrot;
  // spin-2 = lemon;
  // spin-3 = seven;
  // spin-4 = gold;
  // spin-5 = cherry;
  // spin-6 = bananas;
  // since it has two class attr, we need to slice 5 to get the spin-#;
  var img1 = document.getElementById('ring1').classList.value.slice(5);
  var img2 = document.getElementById('ring2').classList.value.slice(5);
  var img3 = document.getElementById('ring3').classList.value.slice(5);
  function getName(img){
    let imageName;
    switch (img) {
      case 'spin-1':
        imageName = 'carrot';
        break;
      case 'spin-2':
        imageName = 'lemon';
        break;
      case 'spin-3':
        imageName = 'seven';
        break;
      case 'spin-4':
        imageName = 'gold';
        break;
      case 'spin-5':
        imageName = 'cherry';
        break;
      case 'spin-6':
        imageName = 'bananas';
        break;
    }
    return imageName;
  }


  var getImage1 = getName(img1);
  var getImage2 = getName(img2);
  var getImage3 = getName(img3);

  var getStatusBox = document.getElementById('status-winningRound');

  //compares image one and image two for a match
  if (getImage1 === getImage2) {
    //if 1 and 2 match compare image 2 and image 3 for a match
    if (getImage2 === getImage3) {
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
  start();
  console.log('clicked');
  var wager = event.target.value;
  calculateEarnings(wager);
}

//add listener to html elements for click handler
//add these to the button wagers
getWager1.addEventListener('click', clickHandler);
getWager5.addEventListener('click', clickHandler);
getWager10.addEventListener('click', clickHandler);

//this is ran on page load to generate the first 3 images
// renderGameImage();


// Define how many pictures will be used for each ring
let SLOTS_PER_REEL = 6;

// var radius = Math.round( ( 116 / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
let REEL_RADIUS = 106;

//This is the function to create individual rings. we will have 3 rings for the spinning machine;
function createSlots (ring) {

  let slotAngle = 360 / SLOTS_PER_REEL;

  for (let i = 0; i < SLOTS_PER_REEL; i ++) {
    let slot = document.createElement('div');

    slot.className = 'slot';

    // compute and assign the transform for this slot
    let transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    // setup the number to show inside the slots
    // the position is randomized to

    let img = document.createElement('img');
    img.src = imagePool[i].imagePath;
    slot.appendChild(img);
    // add the poster to the row
    ring.append(slot);
  }
}
//DOM 3 rings to the HTML page
var ring1 = document.getElementById('ring1');
createSlots(ring1);
var ring2 = document.getElementById('ring2');
createSlots(ring2);
var ring3 = document.getElementById('ring3');
createSlots(ring3);


function getSeed() {
  // generate random number smaller than 6 then floor it to settle between 0 and 5 inclusive
  return Math.ceil(Math.random()*(SLOTS_PER_REEL));
}

function spin(timer) {
  // Since we have 3 rings, we will spin 3 times;
  for(let i = 1; i < 4; i ++) {

    let lastSeed = 0;

    // checking that the last seed from the previous iteration is not the same as the current iteration;

    // This is to go to the element with ring number ID, grab the value of it's class.
    // lastClass could be shortened to $('#ring'+i).attr('class') if using jQuery;
    let lastClass = document.getElementById('ring'+i).classList.value;

    // since we're giving the ring div individual spin class for animation, at the beginning, there's no spin class, so the length of classList value should be 4, which is 'ring'.
    //but if after we click the spin button, the new class is added to each ring div, trigger the animation, assign a new random spin class to them. Thus the length of that value would be greater than 4.
    if(lastClass.length > 4) {
      lastSeed = parseInt(lastClass.slice(10)); // classList = 'ring spin-' with a number, subtract 10, leaves that number.
    }
    let seed = getSeed(); // now compair that number with our 1-6 random number
    while(lastSeed == seed) { // if it matchs, get a new one. Otherwise the ring will not spin
      seed = getSeed();
    }

    // now everytime click the spin button, the ring number tag will be assigned an animation and the class will be updated accordingly. Details effect could be found in
    let ring= document.getElementById('ring'+i);
    ring.style.animation= '1s ease 0s 1 normal none running back-spin, ' + (timer + i*0.5) + 's' + ' ' + 'ease 0s 1 normal none running spin-' + seed;
    ring.className = String('ring spin-' + seed);

  }
}

function start(){
  var timer = 2;
  spin(timer);
}

