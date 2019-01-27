const Chatblocks = require("chatblocks");
const {Block, Text, Button, QuickReply, ListTemplate} = Chatblocks;

async function Menu() {
    return <Block>
        <Text>Are you hungry?</Text>
        <ListTemplate.ListTemplate quickReplies={[<QuickReply payload="OTHER">Get started</QuickReply>]}>
            <ListTemplate.Element>
                <ListTemplate.Image url="http://chatblocks.net/logo.png"/>
                <ListTemplate.Title>Prestigious pizza</ListTemplate.Title>
                <ListTemplate.Subtitle>$10.99</ListTemplate.Subtitle>
                <Button type="element_share"/>
            </ListTemplate.Element>
            <ListTemplate.Element>
                <ListTemplate.Image url="http://chatblocks.net/logo.png"/>
                <ListTemplate.Title>Perfect pasta</ListTemplate.Title>
                <ListTemplate.Subtitle>$11.99</ListTemplate.Subtitle>
                <Button url="http://chatblocks.net">Order...</Button>
            </ListTemplate.Element>
            <ListTemplate.Element>
                <ListTemplate.Image url="http://chatblocks.net/logo.png"/>
                <ListTemplate.Title>Lazy lasagne</ListTemplate.Title>
                <ListTemplate.Subtitle>$12.99</ListTemplate.Subtitle>
                <Button url="http://chatblocks.net">Order...</Button>
            </ListTemplate.Element>
            <ListTemplate.Element>
                <ListTemplate.Image url="http://chatblocks.net/logo.png"/>
                <ListTemplate.Title>Big bigos</ListTemplate.Title>
                <ListTemplate.Subtitle>$99.99</ListTemplate.Subtitle>
                <Button url="http://chatblocks.net">Order...</Button>
            </ListTemplate.Element>
        </ListTemplate.ListTemplate>
    </Block>
}

module.exports = {Menu};