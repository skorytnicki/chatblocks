# chatblocks

![such chatblock](http://chatblocks.net/code.png)

## Idea

Chatbots are just another type of user interface. Nothing more, nothing less.

At least if we think about chatbots as yet-another-UI, 
we can simplify development in many ways.
 
Chatblocks allows you to separate presentational layer,
bot logic (NLP etc.) and server-side work (configuring webhooks etc). 
With this approach, learning curve for your team decreases.

Chatblocks treats messages as representation of some state.
 It does not care about your implementation of webhook, database integration, NLP, or how you deal with payloads. 
 
With our convenient React-style API, you can build your chatbots declaratively, reuse components and 
 integrate with other services (like database or so). We've got ready-made components for Messenger chatbot,
 but your components can do anything.
 
It means you can build chatbots nearly as fast as in Chatfuel, for a fraction of the price, but with all elasticity and possibilities of the custom chatbot. 
 
© [Szymon Korytnicki](http://korytnicki.pl), [chatblocks.net](http://chatblocks.net)


## Sample chatbot

`npm install chatblocks`

For development purposes, set up Messenger bot the easiest way possible.
You have to create your own Facebook app on Developers page.
In your webhook, pass events to Chatblocks instance:

```javascript
app.post("/webhook", (req, res) => {
    const data = req.body;
    if (data.object === "page") {
        data.entry.forEach(function (pageEntry) {
            pageEntry.messaging.forEach(function (event) {
                // Receive event
                // Transform each event as you wish
                // Send it to the bot
                Bot.trigger({
                    senderId: event.sender.id,
                    event: event
                });
            });
        });
    }
    res.sendStatus(200);
});
```

Well, we should actually create a chatblocks instance:

```javascript
const Chatblocks = require("chatblocks");
const MainComponent = require("./compiled/blocks/MainComponent");

// pass config in constructor
const Bot = new Chatblocks.Bot({
    facebookAPIVersion: "v2.11",
    pageAccessToken: process.env.pageAccessToken,
    component: MainComponent
});
```

and create simple chatblock:

```javascript
const Chatblocks = require("chatblocks");
const {Component, Block, Text, ButtonTemplate, Button} = Chatblocks;

class MainComponent extends Component {
    async render(event) {
        return <Block>
            <Text>Hello!</Text>
            <ButtonTemplate text="How are you?">
                <Button payload="fine">Fine</Button>
                <Button url="http://chatblocks.net">chatblocks.net</Button>
            </ButtonTemplate>
        </Block>
    }
}

module.exports = MainComponent;
```

This was easy, huh? Let's create another block to react to button click:

```javascript
const Chatblocks = require("chatblocks");
const {Component, Block, Text, ButtonTemplate, Button} = Chatblocks;

// usually you want to keep one block per file
class FineBlock extends Component {
    async render() {
        return <Text>Test {this.props.emoji}</Text>
    }
}

class MainComponent extends Component {
    async render(event) {
        // event is available in main block only.
        // It can be passed down with props
        if (event.postback && event.postback.payload === "fine") {
            // you can transform event here, or in your webhook
            return <FineBlock emoji="🎉"/>
            // use React-style props to share data
        }
        return <Block>
            <Text>Hello!</Text>
            <ButtonTemplate text="How are you?">
                <Button payload="fine">Fine</Button>
                <Button url="http://chatblocks.net">chatblocks.net</Button>
            </ButtonTemplate>
        </Block>
    }
    // Note that it's pure JavaScript. You can perform any operation here (database, whatever)
}
```

## Compilation

Chatblocks' JSX has to be compiled to pure JavaScript, which looks like:

```javascript
class TestBlock extends Component {
    async render() {
        return await createElement(Block, null, 
        [
            await createElement(Text, null, "Hello")
        ]);
    }
}
```

createElement takes class name, props and ...children parameters. Then, chatblocks creates requests to Facebook, to display messages in conversation.

Chatblocks is compiled using transform-react-jsx babel plugin, with custom pragma. Configuration of your build and watch system is up to you. Your .babelrc file can look like: 

```json
{
  "plugins": [
    ["transform-object-rest-spread"],
    ["transform-react-jsx", { "pragma": "await Chatblocks.createElement" }]
  ]
}
```

Then, you can run commands: `babel --watch blocks --out-dir blocksDist` and `nodemon app.js`
assuming app.js is your server file and you have all chatblocks in blocks directory. In app.js, include chatblocks from `blocksDist` directory.
 
After compilation, you can deploy your bot to Heroku for small price.


# FAQ
 
### Available chatblocks
 
 - Block
 - Text
 - GenericTemplate
 - ButtonTemplate
 - QuickReplies, QuickReply
 - Button
 - MediaTemplate
 - ListTemplate
 - MarkSeen
 - TypingOn
 - TypingOff
 
 
### How to connect multiple fanpages to one webhook?
 
 Create separate `Bot` instances with different page access tokens.
 
### Chatblock component API

Components are very simple. They are classes with asynchronous `render` method.
Render function should return `Block` or single message.  

### How to pass the state?

You can process your data in `render` method or transform it before it reaches your bot (recommended).

### Is it production-ready?

It is, and it isn't. There are many features to add and PR's are welcome. 
Project will have many internal changes in near future, but I don't expect them to break external API.
If you are about to build big chatbot (I mean with tens of thousands of daily users), you might want to read chatblocks code and
decide yourself about your infrastructure etc.

### Why and when should I use it?

- You build lots of chatbots
- You want to build your first chatbot
- You want to optimize developer's work
 
# Todos
  
  - ~~Improve Button~~
  - ~~Improve Generic template~~
  - ~~Add List block~~
  - ~~Add Media block (image)~~
  - ~~Add sender actions~~
  - Improve docs. Add description of each chatblock.
  - Add Delay block
  - Add Route block (not sure about that)
  - Harmonize Element API
  - Write tests
  - Rewrite to TypeScript
  - Create better watch and build tools
  - Release utils library for common tasks related to bots (Get Started, Persistent Menu, whitelisting...)
  - Improve social media of the project
  
# Author

Chatblocks is created and maintained by [Szymon Korytnicki](http://twitter.com/skorytnicki).
 
 