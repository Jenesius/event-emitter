const _on = function(this: EventEmitter |typeof EventEmitter, name: string, callback: Callback) {
	if (!(name in this.events)) this.events[name] = [];
	
	this.events[name].push(callback);
	
	return this.off.bind(this, name, callback);
}
const _emit = function(this: EventEmitter |typeof EventEmitter, name: string, data?: any) {
	if (! (name in this.events)) return;
	
	this.events[name].forEach(cl => cl(data));
}

const _off = function (this: EventEmitter | typeof EventEmitter, name: string, callback: Callback) {
	const arr = this.events[name];
	if (!arr) return;
	
	const index = arr.indexOf(callback);
	
	if (index === -1) return;
	arr.splice(index, 1);
}

const _cleanEvents = function (this: EventEmitter | typeof EventEmitter) {
	this.events = {};
}

export default class EventEmitter{
	
	events: {
		[name: string]: Callback[]
	} = {}
	
	on(name: string, callback: Callback) {
		return _on.call(this, name, callback)
	}
	emit(name: string, data?: any) {
		return _emit.call(this, name, data);
	}
	
	off(name: string, callback: Callback) {
		return _off.call(this, name, callback);
	}
	
	cleanEvents(){
		_cleanEvents.call(this);
	}
	
	
	/**
	 * ONLY FOR GLOBAL USING!
	 * */
	
	static events: {
		[name: string]: Callback[]
	} = {}
	
	static on(name: string, callback: Callback){
		return _on.call(EventEmitter, name, callback)
	}
	static emit(name: string, data?: any) {
		return _emit.call(EventEmitter, name, data);
	}
	static off(name: string, callback: Callback) {
		return _off.call(EventEmitter, name, callback);
	}

	static cleanEvents() {
		_cleanEvents.call(EventEmitter);
	}
	
}

export type Callback = (data?: any) => any | void
