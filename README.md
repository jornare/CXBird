# CXBird

CXBird is a HTML5 multiplayer game similar to "Flappy Bird" developed by Computas for NDC Oslo 2014

## How to play
Once in the game, clicking Play will give you a colored screen with one big button.
The color of the screen is the same as your player/bird.
Click the button to fly, avoid the roses to gather points.
### @NDC Oslo
- Connect to our wifi "Computas"
- Open a web browser on http://192.168.0.2
- Type your handle, click &gt; and Play
- There are prices to win, see the poster for details

## Install

Be sure to have latest version of nodejs installed: http://nodejs.org

Clone this repo using git
```
git clone https://github.com/jornare/CXBird
```
Install dependencies
```
cd CXBird
npm install
```
Fire it up (you can change port if needed, on Windows port 80 often conflicts with a web server or Skype)
```
node app.js
```
optionally with another port or theme
```
node app.js port=3000 theme=city
```

## Raffle / draw a winner
Every user with more than 1 point enter the raffle with 1 ticket
Top 10 gets extra tickets according to their rank. No 10 gets 1 extra ticket, No 9 2 extra and so forth.

In the browser window, navigate to http://192.168.0.2/#/raffle
Click the button when ready and wait for the result

## NDC specifics
### Each morning
The highscores are stored in "players.txt"
Be sure to backup & delete this file before restarting the server each day (see above)