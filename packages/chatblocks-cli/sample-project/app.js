const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require('dotenv').config();

// Usually you don't want to keep these tokens in code.
// Create .env file from provided env.sample file
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

const Chatblocks = require('chatblocks');
// compiled main block
const MainComponent = require('./build/MainComponent');

// pass config in constructor
const Bot = new Chatblocks.Bot({
    // API methods change with API version
    facebookAPIVersion: "v2.11",
    pageAccessToken: PAGE_ACCESS_TOKEN,
    // pass main component
    component: MainComponent
});

app.use(bodyParser.json());
app.get("/webhook", function (req, res) {
    if (req.query["hub.mode"] === "subscribe" &&
        req.query["hub.verify_token"] === VERIFY_TOKEN) {
        console.log("Validating webhook");
        res.status(200).send(req.query["hub.challenge"]);
    } else {
        console.error("Failed validation. Make sure the validation tokens match.");
        res.sendStatus(403);
    }
});

app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.object === "page") {
        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (event) {
                // Receive event
                // Transform each event as you wish
                // Send it to the bot
                Bot.render({
                    senderId: event.sender.id,
                    event: event
                    // you can pass any data to main component here
                });
            });
        });
    }
    res.sendStatus(200);
});

app.listen(3000);