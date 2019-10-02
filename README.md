## Fire Draw

![firedraw logo](/assets/logo.jpeg)


## Description
Firedraw is a parody of JackBox Games "Drawful". Players are presented with a word they must try to draw on the screen. The image is then shown to all players who attempt to guess the original word, with points awarded to players that select the original word and to players that have their response voted as the "correct" word. Developed for Internet Application Term Project.

live demo: [Firedraw](firedraw.herokuapp.com)


## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)

## Installation

Download the repository.
```sh
git clone https://github.com/Peter408/firedraw.git
```

Install node packages for both backend server and client side.
```sh
cd firedraw
npm install
```

```sh
cd client
npm install
```

You will need to setup your own local database.

update environment file (.env) with the following format depending on your needs:
```sh
HEROKU_POSTGRESQL_TEAL_URL='database url'
AWSAccessKeyId='key'
AWSSecretKey='key'
SESSION_SECRET='session'
```

### Running Game
Run the backend server from root
```sh
npm run start:dev
```

Run the React client from client/
```sh
npm start
```

Congrats you have a local game server on your computer!


## Usage
Screenshots of live site:

#### Login Screen
- Users need to login with existing account or create a new account to access firedraw.
![login screen](/assets/login_screen.png)


#### Lobby Screen
- Users may chat with anyone login in at the moment, join an existing game if there are any, or create a new game.
![lobby screen](/assets/lobby_screen.png)


#### Start Game Screen
- Users see different start screens depending on if they're the host of the game getting ready to start.

![start screen](/assets/start_screen.png)


![waiting screen](/assets/waiting_screen.png)


#### Set Up Game
- Draw User icon for current game.

![user icon](/assets/draw_user_screen.png)


#### Gameplay
- Draw picture of given object.

![draw item](/assets/draw_item_screen.png)


- Guess drawing of other users.

![guess item](/assets/guess_item_screen.png)


- User who draws selects the most correct guess for points.

![select item](/assets/selecting_screen.png)


#### Gameplay continues for multiple rounds


## Architecture

#### Basic design of web appliation
![architecture](/assets/architecture.png)

#### Database diagram
![database](/assets/data_base.png)

### Dependencies

Fire Draw uses a number of open source projects to work properly:

* [React.js](https://reactjs.org/) - used for client side rendering
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [Canvas API](https://canvas.instructure.com/doc/api/) - used for drawing on the page
* [Socket.io](https://socket.io/) - framework used for in game and lobby chat
* [Passports](http://www.passportjs.org/) - authentication
* [React Router](https://reacttraining.com/react-router/) - for client-side routing
* [bcrypt](https://www.npmjs.com/package/bcrypt) - encrypting passwords

