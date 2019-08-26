## Description

This website is an example of a web application highlighting some of the modern technologies. The web application is based on MERN stack - MongoDB, Express.js, and Node.js for back-end and React.js with Redux for front-end.

Web application is contained of login system supported with Passportjs authentication, product list backed with various filters and pagination, cart and checkout screen with Paypal paying option supported with Braintree, user account review/edit screen aswell with orders history and admin options like adding new products, deleting products that are listed and dealing with made orders, internationalization for English and German, and GoogleMaps.

View demo <a href="https://mobileshop123.herokuapp.com/">here</a> or go to "Installation and Usage" and follow the instructions to install and use.

## Technologies & Tools

### Front-end:
* React
* Redux
* Material UI
* Internationalization for English and German
* GoogleMaps
* Paypal paying option supported with Braintree

### Backend:
* Node
* MongoDB
* Express
* Passport

## Installation and Usage

### Requirements:
* Node.js installed
* MongoDB
* Braintree mechant account with linked Paypal credentials

### Quick start: 
1. Install server-side dependencies:
```
$ cd server
$ npm install
```
2. Install client-side dependencies:
```
$ cd client
$ npm install
```
3. In server/config create a keys_dev.js and add your informations:<br/>
```
module.exports = {
  mongoURI: "YOUR_OWN_MONGODB",
  secretOrKey: "YOUR_OWN_SECRETORKEY",
  merchantId: "YOUR_OWN MERCHANTID",
  publicKey: "YOUR_OWN_PUBLICKEY",
  privateKey: "YOUR_OWN_PRIVATEKEY"
  }
```
4. Start your client
```
$ cd client
$ npm run start
```
5. Start your server
```
$ cd server
$ npm run server
```