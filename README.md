# event-emitter
Simple, small and with off-hook.
```js
import EventEmitter from "jenesius-vue-modal";

const offMessage = EventEmitter.on('message', m => {});

EventEmitter.emit('message', 'simple');

// If handler not needed:
offMessage();
```
