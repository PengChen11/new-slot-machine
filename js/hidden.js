/* eslint-disable no-undef */
'use strict';
// to set a password for admin consol
var setPassword = 'pengchen';


//this is the function to show password page of admin panel when the speficic part of HTML page was double clicked

$('#access').dblclick(function(){
  $('#multipliers').hide('slow');
  $('#hidden').show('slow');
  $('#password').show('slow');
});

// this is the function to challenge the password.
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
$('#cheatSheet').submit(function(event){
  event.preventDefault();
  // reason of doing this if statement, is to say, if you don't want to mess with the win/lose ratio, you just simplly leave it blank.
  if ($('#small').val()!==''){
    winSetSmall = Number($('#small').val());
  }
  if ($('#mid').val()!==''){
    winSetMid = Number($('#mid').val());
  }
  if ($('#big').val()!==''){
    winSetBig = Number($('#big').val());
  }
  //once you submit the win/loss ratio, system will hide the admin panel and display the mutipliers again.
  $('#cheatSheet').hide('slow');
  $('#hidden').hide('slow');
  $('#multipliers').show('slow');
  //every time you mess with win/loss ratio, syste, will reset the fail trackers.
  failTrackerSmall = 0;
  failTrackerMid = 0;
  failTrackerBig = 0;
});
