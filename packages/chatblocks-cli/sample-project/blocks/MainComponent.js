const Chatblocks = require("chatblocks");
const {Text, ButtonTemplate, Button, Block} = Chatblocks;
const ChatblocksRouter = require("chatblocks-router");
const {Router, Route} = ChatblocksRouter;
const {Menu} = require('./Menu');
const {GetStarted} = require('./GetStarted');

async function MainComponent(event) {
    // event is available in main block only.
    // It can be passed down with props

    // react-like magic!
    if (event.postback) {
        return <Router currentRoute={event.postback.payload}>
            <Route path="MENU">
                <Text>Hello, this happens when you click MENU</Text>
                <ButtonTemplate sharable={true} text="How are you?">
                    <Button payload="MENU">Menu</Button>
                    <Button payload="TEST">Test</Button>
                </ButtonTemplate>
            </Route>
            <Route path="TEST">
                <Text>Hello, this happens when you click TEST</Text>
                <ButtonTemplate sharable={true} text="How are you?">
                    <Button payload="MENU">Menu</Button>
                    <Button payload="TEST">Test</Button>
                </ButtonTemplate>
            </Route>
        </Router>
    }

    return <Block>
        <Text>Hello</Text>
        <ButtonTemplate sharable={true} text="How are you?">
            <Button payload="MENU">🍕 Menu</Button>
            <Button payload="TEST">🍕 Menu</Button>
        </ButtonTemplate>
    </Block>

}

module.exports = MainComponent;