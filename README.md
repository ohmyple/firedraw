# Fire Draw

![logo](https://i.imgur.com/d8abuTQ.jpg)

Welcome to Fire Draw! This is a parody of JackBox Games Drawful, all rights belong to JackBox.

## About
Players are presented with a word they must try to draw on the screen. The image is then shown to all players who attempt to guess the original word, with points awarded to players that select the original word and to players that have their response voted as the "correct" word.

Developed for Internet application group term project

You can play the game here:
firedraw.herokuapp.com

## Dependencies

Fire Draw uses a number of open source projects to work properly:

* [React.js](https://reactjs.org/) - used for client side rendering
* [node.js](https://nodejs.org/en/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [Canvas API](https://canvas.instructure.com/doc/api/) - used for drawing on the page
* [Socket.io](https://socket.io/) - framework used for in game and lobby chat
* [Passports](http://www.passportjs.org/) - authentication
* [React Router](https://reacttraining.com/react-router/) - for client-side routing
* [bcrypt](https://www.npmjs.com/package/bcrypt) - encrypting passwords

## Installation

### Using git
Install the repository
```sh
git clone https://github.com/Peter408/firedraw.git
```
### Development
navigate to root and install node packages using npm.
```sh
cd firedraw
npm install
```
now download node packages for client
```sh
cd client
npm install
```

You will have to create your own postgres database on heroku

	https://devcenter.heroku.com/articles/heroku-postgresql
	- Then you will have to create your own aws server and have the following
		- access key id
		- secret key
		- session secret
	- Follow this documentation to build the server from aws

	https://docs.aws.amazon.com/efs/latest/ug/gs-step-one-create-ec2-resources.html

	this link will explain how to get the access keys and secret keys

	https://docs.aws.amazon.com/general/latest/gr/aws-sec-cred-types.html#access-keys-and-secret-access-keys
Now that you have the following, open your text editor and write the following
```sh
HEROKU_POSTGRESQL_TEAL_URL='database url'
AWSAccessKeyId='key'
AWSSecretKey='key'
SESSION_SECRET='session'
```
make sure to replace 'key/url' with the actual keys/url
save it and name the file .env
you should now see this in your root folder
![root](https://i.imgur.com/Ku9q7ns.png)

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

