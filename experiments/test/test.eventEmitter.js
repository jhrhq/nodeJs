import { EventEmitter } from 'node:events';

class myEmitter extends EventEmitter {}
const newEvent = new myEmitter();

newEvent.on('testEvent', function testEvent(a, b) {
  console.log('🎃 new event occured', a, b, this);
});

newEvent.emit('testEvent', 'a', 'b');
