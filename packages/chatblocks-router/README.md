# chatblocks-router

## Why Router?

It solves common trouble with developing simple chatbot, namely
 separating "routes". You could have used `if` or `switch`
 statements, but it feels not native.

## API

`Router` component wraps `Route` components.

`Router` accepts `currentRoute` prop.
`Route` accepts `path` prop. 

It works like `switch` statement. Chatblocks will render only
children of matching `Route`s.