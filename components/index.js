const Text = require('./Text');
const Block = require('./Block');
const ButtonTemplate = require('./ButtonTemplate');
const Button = require('./Button');
const QuickReply = require("./QuickReply");
const QuickReplies = require("./QuickReplies");
const GenericTemplate = require("./GenericTemplate");

const components = [Text, Block, ButtonTemplate, Button, QuickReply, QuickReplies];
let componentNames = [...components.map(el => el.name), ...Object.keys(GenericTemplate)];

module.exports = componentNames;