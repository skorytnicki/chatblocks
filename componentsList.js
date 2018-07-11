const Text = require('./components/Text');
const Block = require('./components/Block');
const ButtonTemplate = require('./components/ButtonTemplate');
const Button = require('./components/Button');
const QuickReply = require("./components/QuickReply");
const QuickReplies = require("./components/QuickReplies");
const GenericTemplate = require("./components/GenericTemplate");
const MediaTemplate = require("./components/MediaTemplate");

const components = [Text, Block, ButtonTemplate, Button, QuickReply, QuickReplies, MediaTemplate];
let componentNames = [...components.map(el => el.name), ...Object.keys(GenericTemplate)];

module.exports = componentNames;