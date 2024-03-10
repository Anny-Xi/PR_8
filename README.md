# AI dietitian using OPENAI and Anthropic

## Installation server

To run the server on your local, make sure you have installed node.js v18 or higher 

Make sure you are in the server foler
```sh
npm install
```

Change .env-example to .env and add your own api keys for OPENAI or Anthropic

Test the server local
```sh
npm run dev
```
## Usage front-end

The server and client application are in the folder OP

Use extention like "Live Server" on VS code to run the application, otherwise the server will block your request.

## Issue

The voice recognition only works for English, and is only usable on browsers that allow voice record, Like Chrome or Edge

The speak function will speaks the default language of your browser, in most of case that will be English.

