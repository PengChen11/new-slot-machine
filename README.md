# slot-machine
## 201 group project- Slot Machine
## Team members :
- Kent Sheats 
- Joseph Zabaleta 
- Haley Griffin 
- Peng Chen  

# description
We are building a slot machine, a basic game of chance that can amuse people for hours and hours.  We will allow the user to bet different amounts and accrue winnings based on the bet and whether or not they get a winning combination.

# links & resources
#### resources
[jackpot clip art](https://ya-webdesign.com/explore/jackpot-drawing-slot-machine/)

[Press Start 2P- Google Fonts](https://fonts.google.com/specimen/Press+Start+2P?preview.size=24&preview.text_type=numerals&query=press&selection.family=Press+Start+2P&sidebar.open)

[Images used for the reel](https://pixabay.com/)

[Code Pen - Slot machine reel](https://codepen.io/mops/pen/pKYOqW)

[Layout Inspiration](https://code.sololearn.com/W9Qat1gA8FR1/#html)

#### links
[Link to Deployed page](https://slot-machine-201.github.io/slot-machine/)

[Link to the Repo](https://github.com/slot-machine-201/slot-machine) 

## This is our wireframe:
![This is a wireframe](/assets/wireframe.png)

## This is our work flow:
![This is flow](/assets/flow.png)


Monday- We worked on our plan of attack for the project and how to approach it.  We came up with a wireframe that we all agreed upon and the parameters to attain our MVP.  The user stories and stretch goals are documented within our [requirements.md](/requirements.md).  We got our repository all set up with the necessary directories and files, also with the staging branch and 2 working branches.  We then spit off into working groups and got the HTML layout, and the basic CSS to get things sitting in the place that we wanted it.  We also got the javascript started building out the object constructor and the getting the functions started with a random image generator, we also got the event listeners linked up to our buttons we had place on our page.

Tuesday- We began work to try and get to our MVP by end of day. Joseph finished up with the DOM work getting the credit amounts to deduct and add according to the spin outcomes.  Peng began work on an MVP which is to have an actual spinning wheel where you see the images pass the screen.  And Griffin and Kent got the page styling CSS going with resizing the page to better fit the screen, font styling, background images and colors, getting the images to to line up in the proper windows.  We also pushed all branches up to master and deployed the site for our product.  We got the page updated with the spinning reel that shows the images as the spin by.

Wednesday- We had a few bugs to work out.  We set delay on the winning round totals being shown in the top left corner, so that it will not display until after the reel stops spinning.  Added multipliers on pairs along with 3 of a kind to increase the chances of getting a reward, which had dropped drastically when we increased our total images from 3 to 6.

Thursday- We worked on cleanup of the code for sake of readability: removing all console logs, moving the reel functions to its own file, removing stale code, adding in comments and fixing any errors within.  We also made some final tweaks to the styling and wording on the page.  We added a function to increase wins if none occur.  