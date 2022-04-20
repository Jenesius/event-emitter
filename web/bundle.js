'use strict';

/*!
  * jenesius-event-emitter v1.0.2
  * (c) 2022 Jenesius
  * @license MIT
  */
const _on = function (name, callback) {
    if (!(name in this.events))
        this.events[name] = [];
    this.events[name].push(callback);
    return this.off.bind(this, name, callback);
};
const _emit = function (name, data) {
    if (!(name in this.events))
        return;
    this.events[name].forEach(cl => cl(data));
};
const _off = function (name, callback) {
    const arr = this.events[name];
    if (!arr)
        return;
    const index = arr.indexOf(callback);
    if (index === -1)
        return;
    arr.splice(index, 1);
};
const _cleanEvents = function () {
    this.events = {};
};
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(name, callback) {
        return _on.call(this, name, callback);
    }
    emit(name, data) {
        return _emit.call(this, name, data);
    }
    off(name, callback) {
        return _off.call(this, name, callback);
    }
    cleanEvents() {
        _cleanEvents.call(this);
    }
    static on(name, callback) {
        return _on.call(EventEmitter, name, callback);
    }
    static emit(name, data) {
        return _emit.call(EventEmitter, name, data);
    }
    static off(name, callback) {
        return _off.call(EventEmitter, name, callback);
    }
    static cleanEvents() {
        _cleanEvents.call(EventEmitter);
    }
}
/**
 * ONLY FOR GLOBAL USING!
 * */
EventEmitter.events = {};

const off = EventEmitter.on('test', () => {
	console.log('[static] test');
});

setInterval(() => {
	EventEmitter.emit('test');
}, 1000);

class Test extends EventEmitter {


}

const test = new Test();
test.on('test', () => {
	console.log('not static. off');
	off();
});

setTimeout(() => {
	test.emit('test');
}, 5000);
