// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
require('dotenv').config({path:__dirname+'/./../.env'});

const { WebClient, LogLevel } = require("@slack/web-api");

// WebClient instantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.SLACK_BOT_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
});
// list of messages that automatically get sent to slack
let generalId = "C02BN7337RR";
let nextAIOnPoint = "<@U02CBN7HW0G> \"ai\" assign next";
let nextPlatformOnPoint ="<@U02CBN7HW0G> \"platform\" assign next";
let listOnPoint = "<@U02CBN7HW0G> list";
let runHelp = "<@U02CBN7HW0G> help";
let runs = 0;
//let nextPlatformOnPoint = `<@U02CBN7HW0G> "platform" assign next`
console.log(process.env.SLACK_BOT_TOKEN);
// Post a message to a channel your app is in using ID and message text
async function publishMessage(id, text) {
    try {
        // Call the chat.postMessage method using the built-in WebClient
        const result = await client.chat.postMessage({
            // The token you used to initialize your app
            token: process.env.SLACK_BOT_TOKEN,
            channel: id,
            text: text
            // You could also use a blocks[] array to send richer content
        });

        // Print result, which includes information about the message (like TS)
        console.log(result);
    }
    catch (error) {
        console.error(error);
    }
}

// Schedule for automatically assigning the next person in the rotation

function scheduleChange(assignmentGroup){
    console.log("Rotation updated for " + assignmentGroup);
    return publishMessage(generalId, assignmentGroup);
}

let swaps = setInterval(function(){
    runs += 1;
    console.log(runs);
    if (runs > 1) {
        clearInterval(swaps);
    }
    return scheduleChange(nextAIOnPoint);
}, 10000);

