# What is the vision of this product?
- To create a functional and fun casino type game, to attract gamblers to our site to spend their hard earned cash.  
- We also want to give the player the opportunity to win the big prize and become rich.  
- We want the site owner to be able to generate a profit by manipulating the win/loss ratio.     

# What pain point does this project solve?
- Will give the site owner the ability to control their profit flow by allowing them to control the win/loss ratio. Otherwise will not be attractive to the owners if people win too much and not attractive to the players if they do not win at all.
- During the current climate in the world people cannot go to casinos to gamble, this gives them the opportunity to gamble from the comfort of their own homes.
- This product will entertain people hours on end.

# Why should we care about your product?
- Casinos cannot open to the public, but they need to generate profits, our product will allow them to continue to achieve this goal.
- The player can potentially make some money.
- Provides distraction and entertainment to players, especially in this time of mandatory quarantines.

# Scope-
- What will our product do?  
## MVP
1. As a user I would like to display 3 pictures randomly, if you get all 3 the same you get a reward based upon their values.
    - Create a constructor function that creates an object for each window shown on page.
    - Use name and file path as parameters.
    - Create an algorithm to randomly generate 3 pictures with the ability to show all 3 windows having the same picture.
    - Attach an event listener to section of HTML where images will be displayed
    - When user clicks on wager button decrement their total and begin the spin of the images

2. As a user, when I visit the site I would like to receive a welcome bonus at the beginning to start to play the game. 
    - When they visit the site have a prompt welcoming the visitor and telling them that we will spot them $100 to start off their gambling experience.
    - Once the visitor is ready to start the game we will add the balance to their account so that they can start play.

3. As a user, when player wins I would like to have the account balance automatically updated in real time. 
    - Create a function that will track the outcome of the spin and update the users balance.

4. As a user I would like update the user upon a successful spin, letting them know what amount they won that spin.
    - Create a function to show the winnings for that spin to write to the HTML. 

5. As a user i would like to have a low skill game for participants that requires no skill to win, and will attract players to spend a lot of time playing our game.
    - Display clear instructions on how to play and win.
    - Create a visually pleasing website, that is easy on the eyes and gets people excited to win money. 

6. As a user I want to let the player know when the game is over.
    - Have an alert when the players Total reached $1000 or more saying “Congratulations you are a Big Winner”
    - Have an alert when the players total reaches $0 saying “Sorry you are broke!”

7. As a user I want to be able to control the win/ loss ratio, so if busy we can make winning more difficult and if not busy easy to win to attract more users.
    - Create a function to be able to give the player a win after a certain number of rounds, for example if they fail to win a jackpot in 10 spins on the 11th they will be rewarded with a jackpot.
    - Create a hidden function, 3 things - after a set number of rounds have the player win a low level jackpot, after another set number have the second level jackpot, and then after a set number of rounds have the player win the largest jackpot.

  Stretch Goals:
1. As a user, when my account balance is lower than a set line, I want the system reminds me for a recharge.
2. As a user, I want to be able to end the game at any time. When I end my game, I want the system to be able to send all the money I won or my remaining balance back to my card. Or if you just end the game give an update of how you did, winnings/ losses
3. As a user I want to be able to control the win/ loss ratio, so if busy we can make winning more difficult and if not busy easy to win to attract more users.