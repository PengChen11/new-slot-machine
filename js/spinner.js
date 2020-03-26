'use strict';
/***** GLOBAL VARIABLES *****/
//this is where you put the win/lose ratio. this means if the player fail for certain rounds to hit a 3 in a row winning, the system will give them a win at the next round.
var winSetSmall = 5;
var winSetMid = 10;
var winSetBig = 15;
// Define how many pictures will be used for each ring
var SLOTS_PER_REEL = 6;
// var radius = Math.round( ( 116 / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) );
var REEL_RADIUS = 106; //106 is the number I tested out to make the ring size fit the windows of the slot machine.

//The output from the spinning wheel is no longer a img. It is a tag class for the div that holds the ring.
// spin-1 = carrot, spin-2 = lemon, spin-3 = seven, spin-4 = gold, spin-5 = cherry, spin-6 = bananas;

function getName(img){
  var imageName;
  switch (img) {
  case 'spin-1':
    imageName = 'cherry';
    break;
  case 'spin-2':
    imageName = 'bananas';
    break;
  case 'spin-3':
    imageName = 'carrot';
    break;
  case 'spin-4':
    imageName = 'lemon';
    break;
  case 'spin-5':
    imageName = 'seven';
    break;
  case 'spin-6':
    imageName = 'gold';
    break;
  }
  return imageName;
}

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

// function to determine which random picture to show when the spin stops. When we have a pre-set to affect the win/lose ratio, then it will compaire the fail rounds vs win rounds, and then return the number based on conditions.
function getSeed() {
  var seedReturn;
  if (failTrackerSmall === winSetSmall){
    seedReturn = 2;
  } else if(failTrackerMid === winSetMid){
    seedReturn = 5;
  } else if (failTrackerBig === winSetBig){
    seedReturn = 6;
  } else {
    seedReturn = Math.ceil(Math.random()*(SLOTS_PER_REEL));
  }
  return seedReturn;

}

// this is the function to spin the rings.
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
    var seed = getSeed(); // now compair that number with our 1-6 random number. if the new spin equals the last spin, then we still want the ring to spin. thus we need to reset the annamation then re assign it.
    if (lastSeed == seed) {
      var ring= document.getElementById('ring'+i);
      ring.style.animation = 'none';
      ring.offsetHeight;
      ring.style.animation= String('spin-' + seed + ' ' + (timer + i*0.5) + 's' + ' ' + ' ease');
      ring.className = String('ring spin-' + seed);
    } else {
      var ring= document.getElementById('ring'+i);
      ring.style.animation= String('spin-' + seed + ' ' + (timer + i*0.5) + 's' + ' ' + ' ease');
      ring.className = String('ring spin-' + seed);
    }
    // now everytime when click the spin button, the ring number tag will be assigned an animation and the class attr will be updated accordingly. Details effect could be found in CSS file.

  }
}
// function to start the spin
// eslint-disable-next-line no-unused-vars
function start() {
  var timer = 2;
  spin(timer);
}
