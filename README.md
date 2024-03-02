# nodejs-test
> nodejs, mongodb
## Getting Started
>  [Technologies](#technologies-used) &middot; [Testing Tools](#testing-tools) &middot; [Installations](#installations) &middot; [Author](#author)

## Technologies Used
- [Node.js](node) A run time environment based off Chrome's v8 Engines for writing Javascript server-side applications.
- [Express.js](https://expressjs.com) - Web application framework based on Node.js.

## Testing Tools
- [Jest](https://jestjs.io/) Jest is a JavaScript testing framework maintained by Facebook, Inc. designed and built by Christoph Nakazawa with a focus on simplicity and support for large web applications.

## Installations
#### Getting started
- You need to have Node and NPM installed on your computer.
- Installing [Node](node) automatically comes with npm.

#### Clone
- Clone this project to your local machine `https://github.com/hazon-technologies/nodejs-test
ils. see env.example for details
#### Setup
- Installing the project dependencies
  > Run the command below
  ```shell
  $ npm install
  ```
- Start your node server
  > run the command below
   ```shell
   $ npm run dev
  ```
- Use `http://localhost:${PORT_NUMBER_SET_IN_ENV}` as base url for endpoints

WebSocket Integration and Authentication
WebSocket Integration
WebSocket is used to enable real-time communication between the server and clients. The WebSocket server is integrated into the application using the ws library. Here's how it works:

The server creates a WebSocket server instance to handle WebSocket connections.
When a client connects to the WebSocket server, it logs a message indicating the connection is established.
When the server receives a message from a client, it logs the received message.
The broadcast function allows broadcasting messages to all connected WebSocket clients.

Authentication Service
The authentication service handles user signup and login functionality. Here's how it works:

Signup: When a user attempts to sign up, the service checks if the user already exists in the database. If not, it hashes the password, creates a new user object, and saves it to the database. The service then returns a success message with the newly created user data.
Login: When a user attempts to log in, the service retrieves the user's data based on the provided email or username. If the user exists, it verifies the password. If the password is correct, it generates an access token using JSON Web Tokens (JWT). It then broadcasts a login message to all connected WebSocket clients with the username of the logged-in user. Finally, it returns a success message with the user data and access token.


Postman Documentation: https://documenter.getpostman.com/view/20301706/2s9Yynn51D

## Author
-Asoko Adeolu 