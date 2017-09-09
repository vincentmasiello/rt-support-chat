import {EventEmitter} from 'events';

/*
 * Socket
 * handle the socket messaging and expose a simpler 
 * interface to the app
 */
class Socket {
	constructor(ws, ee = new EventEmitter()) {
		this.ws = ws;
		this.ee = ee;

		ws.onmessage = this.message.bind(this);
		ws.onopen = this.open.bind(this);
		ws.onclose = this.close.bind(this);
	}

	on(name, fn) {
		this.ee.on(name, fn);
	}
	off(name, fn) {
		this.ee.removeListener(name, fn);
	}
	emit(name, data) {
		// console.log(`${name}, ${data.name}`);
		const message = JSON.stringify({name, data});
		this.ws.send(message);
	}

	/* Socket event handlers */
	message(e) {
		try {
			const message = JSON.parse(e.data);

			/* at this point any event listeners called in 
			 * app component will be called
			 */
			this.ee.emit(message.name, message.data);
		} catch (err) {
			this.ee.emit('error');
		}
	}
	open() {
		this.ee.emit('connect');
	}
	close() {
		this.ee.emit('disconnect');
	}
}

export default Socket;