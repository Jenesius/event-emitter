import EventEmitter from "../dist/index.esm";

const off = EventEmitter.on('test', () => {
	console.log('[static] test');
})

setInterval(() => {
	EventEmitter.emit('test');
}, 1000)

class Test extends EventEmitter {


}

const test = new Test()
test.on('test', () => {
	console.log('not static. off');
	off();
})

setTimeout(() => {
	test.emit('test');
}, 5000);



