# chatblocks

![such chatblock](http://chatblocks.net/code2.png)

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


## What's in this repo

This is monorepo managed with Lerna for all packages related to chatblocks (chatblocks, chatblocks-cli, chatblocks-router).

Please go to `packages/chatblocks/README.md` to read more about chatblocks itself. 


# Author

[Szymon Korytnicki](http://twitter.com/skorytnicki).
 
 