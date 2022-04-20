# event-emitter
Simple, small and with off-hook.

### Global usign
```js
import EventEmitter from "jenesius-vue-modal";

const offMessage = EventEmitter.on('message', m => {});

EventEmitter.emit('message', 'simple');

// If handler not needed:
offMessage();
```

### Extends using
```js
class Test extends EventEmitter {
    // ...
}
const test = new Test()
test.on('message', () => {})

test.emit('message');
```
or
```js
const a = new EventEmitter();
a.on('message', () => {})
a.emit('message');
```
