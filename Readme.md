# VK bot nodes for Node-RED



This package contains a receiver and a sender node which act as a Telegram Bot.
The only thing required is the `token` that can be retrieved by the https://vk.com/club${id}?act=tokens.

 

# Installation

You can install the nodes using node-red's "Manage palette" in the side bar.

Or run the following command in the root directory of your Node-RED installation

    npm i node-red node-red-contrib-vk-io-bot --save -g
or

    npm init -y
    npm install node-red node-red-contrib-vk-io-bot --save

Note that the minimum node-red version 1.3.7 and minimum nodejs version is 12.x. 

# Start
    node-red

# Dependencies
The nodes are tested with `Node.js v18.16.0` and `Node-RED v3.0.2`.
 - [vk-io](https://github.com/negezor/vk-io)


# Usage
## Basics
### Config - First you need add config
- token (https://vk.com/club${id}?act=tokens)
![Config](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/0.png)
### Recipient - listens for all incoming messages
![Receiver](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/1.png)
### Sender - sends a message to the given user
Text and user ID can be set manually or passed to the input of the node
![Sender](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/5.png)
### Event - listens for events through long polls and passes the events selected in the node configuration to the output
![Event](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/2.png)
### Callback-event -receives events from the outside and passes the events selected in the node configuration to the output.
To receive requests from VK servers, you need to add a node "response", you also need to add "http in", from the node "http in" you need to add a thread to the input "callback-event"
Do not forget to confirm your server, for this, between the nodes "http in" and "http response" you need to add "template" with a response for confirmation and for a permanent response to incoming requests
![Callback event](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/6.png)
![Callback event](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/7.png)
### Command - listens to specific messages through long polls for exact match or regular expression
![Command](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/3.png)
### Keyboard - visual keyboard builder
![Keyboard](https://github.com/borovlioff/node-red-contrib-vk-io-bot/blob/master/doc/4.png)
