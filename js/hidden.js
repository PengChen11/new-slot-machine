'use strict';
// to set a password for admin consol
var setPassword = 'pengchen';

//this is the function to  show the hidden HTML element
// function show(ElementID) {
//   var x = document.getElementById(ElementID);
//   x.style.display = 'block';
// }

// //this is the function to hide the shown HTML element
// function hide(ElementID) {
//   var y = document.getElementById(ElementID);
//   y.style.display = 'none';
// }

//this is the function to show password page of admin panel when the speficic part of HTML page was clicked
// var accessEl = document.getElementById('access');
// function accessHandler(){
//   hide('multipliers');
//   show('hidden');
//   show('password');
// }
// accessEl.addEventListener('click', accessHandler);

//This is the jQuery version of the above function. Refer to it for function details
$('#access').dblclick(function(){
  $('#multipliers').hide('slow');
  $('#hidden').show('slow');
  $('#password').show('slow');
});

// this is the function to challenge the password.
// var passEl = document.getElementById('password');
// function passwordHandler(event){
//   event.preventDefault();
//   var password = event.target.password.value;
//   if (password === setPassword){
//     hide('password');
//     show('cheatSheet');
//   } else {
//     hide ('hidden');
//     show ('multipliers');
//     alert("Hey, stop messing with me!!! Or I'll crash your computer!!!");
//   }
// }
// passEl.addEventListener('submit',passwordHandler);

// //This is the jQuery version of the above function. Refer to it for function details
$('#password').submit(function(event){
  event.preventDefault();
  if($('#password input').val() === setPassword){
    $('#password').hide('slow');
    $('#cheatSheet').show('slow');
  } else{
    alert('Hey, stop messing with me!!! Or I\'ll crash your computer!!!');
    $('#hidden').hide('slow');
    $('#multipliers').show('slow');
  }
  $('#password input').val('');
});


//this is the function to go to the form and grab the values for those 3 variables and set them to give the player a winning spin per how many failing spins
// var cheatSheetEl = document.getElementById('cheatSheet');
// function cheatHandler(event){
//   event.preventDefault();
//   // reason of doing this if statement, is to say, if you don't want to mess with the win/lose ratio, you just simplly leave it blank.
//   if (event.target.small.value !== ''){
//     winSetSmall = Number(event.target.small.value);
//     // console.log('winSetSmall', winSetSmall );
//   }
//   if (event.target.mid.value !== ''){
//     winSetMid = Number(event.target.mid.value);
//     // console.log('winSetMid', winSetMid);
//   }
//   if (event.target.big.value !== ''){
//     winSetBig = Number(event.target.big.value);
//     // console.log('winSetBig', winSetBig);
//   }
//   //once you submit the win/loss ratio, system will hide the admin panel and display the mutipliers again.
//   hide ('cheatSheet');
//   hide ('hidden');
//   show ('multipliers');
//   //every time you mess with win/loss ratio, syste, will reset the fail trackers.
//   failTrackerSmall = 0;
//   failTrackerMid = 0;
//   failTrackerBig = 0;
// }
// cheatSheetEl.addEventListener('submit', cheatHandler);


// //This is the jQuery version of the above function. Refer to it for function details
$('#cheatSheet').submit(function(event){
  event.preventDefault();
  if ($('#small').val()!==''){
    winSetSmall = Number($('#small').val());
  }
  if ($('#mid').val()!==''){
    winSetMid = Number($('#mid').val());
  }
  if ($('#big').val()!==''){
    winSetBig = Number($('#big').val());
  }
  $('#cheatSheet').hide('slow');
  $('#hidden').hide('slow');
  $('#multipliers').show('slow');
  failTrackerSmall = 0;
  failTrackerMid = 0;
  failTrackerBig = 0;

});
