'use strict';
/***** GLOBAL VARIABLES *****/
var failTrackerSmall = 0;
var failTrackerMid = 0;
var failTrackerBig = 0;
//imagePool array for holding all gameImage Objects
var imagePool = [];
//Starting credit amount for the game
var credits = 100;
// //creating variables to access wager buttons in html

//construction function to create image objects
function GameImage (name, imagePath, wagerMultiplier, matchOftwoMultiplier) {
  this.name = name;
  this.imagePath = imagePath;
  this.wagerMultiplier = wagerMultiplier;
  this.matchOftwoMultiplier = matchOftwoMultiplier;
  imagePool.push(this);
}

//creating gameImage Objects using constructor.Warning: the sequence of the array for following items are vital for win/loss ratio calculation. . don't alter the following order.
new GameImage('seven', 'assets/seven.png', 10, 3);
new GameImage('gold', 'assets/gold.png', 15, 5);
new GameImage('cherry', 'assets/cherry.png', 5, 2);
new GameImage('bananas', 'assets/bananas.png', 5, 2);
new GameImage('carrot', 'assets/carrot.png', 5, 2);
new GameImage('lemon', 'assets/lemon.png', 5, 2);

//function to update credit balance
function creditUpdate() {
  //reset to defaullt text for this status bar
  $('#status-winningRound p').text('Get 3 of a kind to win a jackpot!');
  //conditional logic to determine the balance of credits
  if (credits > 0 && credits < 1000) {
    $('#status-dollar p').text(' $' + credits);
  } else if (credits >= 1000) {
    $('#status-dollar p').text(' $' + credits);
    alert('You have won by reaching more than $1000!');
  } else {
    credits = 0;
    $('#status-dollar p').text(' $' + credits);
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
  var statusTxt = 'You have won $ ' + status + '!';
  $('#status-winningRound p').text(statusTxt);
}

//function to calculate how much creadit you've earned/lost per spin
function calculateEarnings(wager) {

  // since it has two class attr, we need to slice 5 to get the spin-#;
  var img1 = $('#ring1').attr('class').slice(5);
  var img2 = $('#ring2').attr('class').slice(5);
  var img3 = $('#ring3').attr('class').slice(5);

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
        // this is to reset the fail tracher for different winning prizes;
        if (matchOfThree === 'gold'){
          failTrackerBig = 0;
          failTrackerMid = 0;
          failTrackerSmall = 0;
        } else if (matchOfThree === 'seven'){
          failTrackerMid = 0;
          failTrackerSmall = 0;
        } else {
          failTrackerSmall =0;
          seedSmall = 0;
        }
        creditUpdate();
        statusUpdate(winningResult);
      }
    }
  } else if ( //two of a kind match in a row
    getImage1 === getImage2 && getImage1 !== getImage3 ||
      getImage2 === getImage3 && getImage2 !== getImage1) {
    //if there is a match of two in a row, 1st and 2nd or 2nd and 3rd pictures
    var matchOfTwo = getImage2;
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
      creditUpdateLoss(wager);
    }
    // everything doesn't equal to a 3 in a row will update the fail tracker
    failTrackerSmall++;
    failTrackerMid++;
    failTrackerBig++;

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
    // everything doesn't equal to a 3 in a row will update the fail tracker
    failTrackerSmall++;
    failTrackerMid++;
    failTrackerBig++;

  } else {//if there are no matches at all this runs
    creditUpdateLoss(wager);
    // everything doesn't equal to a 3 in a row will update the fail tracker
    failTrackerSmall++;
    failTrackerMid++;
    failTrackerBig++;
  }
}

//click handler for handling when a wager button is clicked
function clickHandler(event) {
  //start function is on spinner.js which starts the spinning of the reels
  start();
  // since start function will spin the wheels 3.5s, we set a delay timer for 3.6s so the result won't pop up before the wheel stops. At the mean time, we disable the buttons, so that people can't keep hitting the buttons to spin the machine.
  // after the wheel starts to spin, we disable the 3 wager buttons.
  $('#bet1').attr('disabled',true);
  $('#bet5').attr('disabled',true);
  $('#bet10').attr('disabled',true);

  // after the wheels stops, we run the funnction to calculate win/loss credits based on the result. Also enable those wager buttons.
  var wager = event.target.value;
  setTimeout(function (){
    calculateEarnings(wager);
    $('#bet1').attr('disabled',false);
    $('#bet5').attr('disabled',false);
    $('#bet10').attr('disabled',false);
  }, 3600);
}

//add listener to wager buttons for click handler
$('#bet1').click(clickHandler);
$('#bet5').click(clickHandler);
$('#bet10').click(clickHandler);
