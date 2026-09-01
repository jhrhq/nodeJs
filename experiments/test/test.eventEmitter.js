import { EventEmitter } from 'node:events';
import { styleText } from 'node:util';

class myEmitter extends EventEmitter {}
const newEvent = new myEmitter();

newEvent.on('testEvent', function testEvent(a, b) {
  console.log('🎃 new event occured', a, b, '\n');
});

newEvent.emit('testEvent', 'a', 'b');

newEvent.on('test', () => {
  console.log('🎃 Test Event\n');
});

newEvent.emit('test');

newEvent.on('test', (id, name) => {
  console.log(`👤 User ${name} registered with 🪪 ${id} \n`);
});

newEvent.once('onceEvent', () => {
  console.log('1️⃣  This event will attaced only once and then will be removed \n');
});

newEvent.emit('test', 20, 'jhr');

newEvent.emit('onceEvent');

console.log(styleText(['yellow', 'bold'], 'Event Emitter with this!\n'));

newEvent.on('testThis', function (a, b) {
  console.log('🎃 This points to new Event Emitter', a, b, this, '\n');
});

newEvent.on('arrowThis', (a, b) => {
  console.log('🏹 This points to outer context', a, b, this, '\n');
});

newEvent.emit('testThis', 'with', 'this');
newEvent.emit('arrowThis', 'arrow', 'this');

console.log('🔄', 'Total listeners count: ', newEvent.listenerCount('test'), '\n');
console.log(styleText(['green', 'bold'], 'Events end!\n'));

class SimpleEventEmitter {
  constructor() {
    this._events = Object.create(null);
    this._maxListeners = 10;
  }

  on(eventName, listener) {
    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }
    this._events[eventName].push(listener);
    return this;
  }

  emit(eventName, ...args) {
    const listeners = this._events[eventName];
    if (!listeners || listeners.length === 0) {
      return false;
    }

    const handlers = [...listeners];
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].apply(this, args);
    }
    return true;
  }
}

const testEmit = new SimpleEventEmitter();

console.log(testEmit.on('hello', 'hi'));

console.log('\n ==================== \n');

// Usesr registration flow (decoupled Micro-Actions)
let id = 0;
class UserService extends EventEmitter {
  /**
   * create an async registerUser function
   * that takes userData as argument
   * - Primary resposibility: save user to DB
   * - Broadcast the event eg: this.emit('user:registered', user)
   */

  registerUser(userData) {
    const user = { id: id++, ...userData };
    console.log(`[DB] User ${user.email} saved.`);

    this.emit('user:register', user);
    return user;
  }
}

const userService = new UserService();

userService.on('user:registered', (user) => {
  console.log(`[Email service] Sending welcome email to ${user.email}...`);
});

userService.registerUser({ email: 'test@mail.com' });
