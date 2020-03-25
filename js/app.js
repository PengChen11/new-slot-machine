/* eslint-disable indent */
'use strict';

//imagePool array for holding all gameImage Objects
var imagePool = [];
var credits = 100;
// var winningResult = 0;

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


//function to calculate how much creadit you've earned/lost per spin
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

  // since we are checking the class tags, we will need to associate that with an image name in the imagePool
  function getName(img){
    var imageName;
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
        console.log('Jackpot! You matched three in a row!');
      }
    }
  } else if ( //two of a kind match in a row
      getImage1 === getImage2 && getImage1 !== getImage3 ||
      getImage2 === getImage3 && getImage2 !== getImage1) {
      //if there is a match of two in a row, 1st and 2nd or 2nd and 3rd pictures
      var matchOfTwo = getImage2;
        console.log(getImage2);
      for (var i in imagePool) {
        //Compares imagePool names compared to matched name
        if (imagePool[i].name === matchOfTwo) {
          //when a match is found create a winningResult variable which is wager * wagerMultiplier
          var winningResult = (imagePool[i].matchOftwoMultiplier * wager);
          console.log(winningResult);
          //add winningResults to global varaible credits and run creditUpdate
          credits += winningResult;
          creditUpdate();
          statusUpdate(winningResult);
          console.log('you matched two in a row!');
        }
      }
  } else if ( //two of a kind match img 1 and img 3
    getImage1 === getImage3 && getImage1 !== getImage2) {
    //if there is a match of two in a row, 1st and 2nd or 2nd and 3rd pictures
    var matchOfTwo = getImage1;
      console.log(getImage1);
    for (var i in imagePool) {
      //Compares imagePool names compared to matched name
      if (imagePool[i].name === matchOfTwo) {
        //when a match is found create a winningResult variable which is wager * wagerMultiplier
        var winningResult = (imagePool[i].matchOftwoMultiplier * wager);
        console.log(winningResult);
        //add winningResults to global varaible credits and run creditUpdate
        credits += winningResult;
        creditUpdate();
        statusUpdate(winningResult);
        console.log('you matched two! first and third images!');
      }
    }
  } else {//if there are no matches at all this runs
    //create removeWager that turns wager amount negative
    // eslint-disable-next-line no-redeclare
    var removeWager = wager * -1;
    //add removeWager to global variable credits and runs creditUpdate.
    getStatusBox.innerHTML = null;
    credits += removeWager;
    creditUpdate();
    console.log('you lost!');
  }
}


// *********************************** old code remove after test *************************************************
  //compares image one and image two for a match
  // if (getImage1 === getImage2) {
  //   //if 1 and 2 match compare image 2 and image 3 for a match
  //   if (getImage2 === getImage3) {
      // //if all three match, create a varable that is equal to the name of the matched type
      // var matchOfThree = getImage1;
      // //Take the name and run it through the imagePool array
      // for (var i in imagePool) {
      //   //Compares imagePool names compared to matched name
      //   if (imagePool[i].name === matchOfThree) {
      //     //when a match is found create a winningResult variable which is wager * wagerMultiplier
      //     var winningResult = (imagePool[i].wagerMultiplier * wager);
      //     //add winningResults to global varaible credits and run creditUpdate
      //     credits += winningResult;
      //     creditUpdate();
      //     statusUpdate(winningResult);
  //       }
  //     }
  //   } else { //this happens when 1 and 2 match but 2 and 3 do not match
  //     //create removeWager that turns wager amount negative
  //     var removeWager = wager * -1;
  //     //add removeWager to global variable credits and runs creditUpdate.
  //     getStatusBox.innerHTML = null;
  //     credits += removeWager;
  //     creditUpdate();
  //   }
  // } else { //if image one and two do not match
  //   //create removeWager that turns wager amount negative
  //   // eslint-disable-next-line no-redeclare
  //   var removeWager = wager * -1;
  //   //add removeWager to global variable credits and runs creditUpdate.
  //   getStatusBox.innerHTML = null;
  //   credits += removeWager;
  //   creditUpdate();
  // }
    // }

// ******************************************************************************************************************

//click handler for handling when a wager button is clicked
function clickHandler(event) {
  start();
  var wager = event.target.value;
  // since start function will spin the wheels 3.5s, we set a delay timer for 4s so the result won't pop up before the wheel stops.
  setTimeout(function (){
    calculateEarnings(wager);
  }, 3600);
}

//add listener to html elements for click handler
//add these to the button wagers
getWager1.addEventListener('click', clickHandler);
getWager5.addEventListener('click', clickHandler);
getWager10.addEventListener('click', clickHandler);

//this is ran on page load to generate the first 3 images
// renderGameImage();


// Define how many pictures will be used for each ring
var SLOTS_PER_REEL = 6;

// var radius = Math.round( ( 116 / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
var REEL_RADIUS = 106;  //106 is the number I tested out to make the ring size fit the windows of the slot machine.

//This is the function to create individual rings. we will have 3 rings for the spinning machine;
function createSlots (ring) {

  var slotAngle = 360 / SLOTS_PER_REEL;

  //loop 3 times to create 3 rings.
  for (var i = 0; i < SLOTS_PER_REEL; i ++) {
    var slot = document.createElement('div');

    slot.className = 'slot';

    // compute and assign the transform for this slot
    var transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

    slot.style.transform = transform;

    // setup the img to show inside the slots

    var img = document.createElement('img');
    img.src = imagePool[i].imagePath;
    // add the img to the slot
    slot.appendChild(img);
    // add the slots to the ring
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

// just to get a random number between 1-6
function getSeed() {
  return Math.ceil(Math.random()*(SLOTS_PER_REEL));
  // return 1;
}

function spin(timer) {
  // Since we have 3 rings, we will spin one ring at a time, totally 3 times;
  for(var i = 1; i < 4; i ++) {
    // if the ring got the same ramdom number comparing to the last spin, ring will not spin, we have to prevent thsi from happening
    var lastSeed = 0;

    // checking that the last seed from the previous iteration is not the same as the current iteration;
    // This is to go to the element with ring number ID, grab the value of it's class.
    // lastClass could be shortened to $('#ring'+i).attr('class') if using jQuery;
    var lastClass = document.getElementById('ring'+i).classList.value;

    // since we're giving the ring div individual spin class for animation, at the beginning, there's no spin class, so the length of classList value should be 4, which is 'ring'.
    //but if after we click the spin button, the new class is added to each ring div, trigger the animation, assign a new random spin class to them. Thus the length of that value would be greater than 4.
    if(lastClass.length > 4) {
      lastSeed = parseInt(lastClass.slice(10)); // classList = 'ring spin-' with a number, subtract 10, leaves that number.
    }
    var seed = getSeed(); // now compair that number with our 1-6 random number
    while(lastSeed == seed) { // if it matchs, get a new one. Or the ring will not spin
      seed = getSeed();
    }

    // now everytime when click the spin button, the ring number tag will be assigned an animation and the class attr will be updated accordingly. Details effect could be found in CSS file.
    var ring= document.getElementById('ring'+i);
    ring.style.animation= '1s ease 0s 1 normal none running back-spin, ' + (timer + i*0.5) + 's' + ' ' + 'ease 0s 1 normal none running spin-' + seed;
    ring.className = String('ring spin-' + seed);

  }
}
// function to start the spin
function start() {
  var timer = 2;
  spin(timer);
}