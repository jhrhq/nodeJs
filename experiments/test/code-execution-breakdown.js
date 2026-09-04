import fs from 'node:fs';

console.log('1.Sync start');

setTimeout(() => {
  console.log('2. setTimeout 0ms (Timers Phase)');
}, 0);

setImmediate(() => {
  console.log('3. setImmediate (Check phase)');
});

Promise.resolve().then(() => {
  console.log('4. promise microTask');
});

process.nextTick(() => {
  console.log('5. process.nextTick microTask');
});

fs.readFile(import.meta.filename, () => {
  console.log('6. I/O callback (pull phase)');

  setTimeout(() => {
    console.log('7. setTimout inside I/O');
  }, 0);

  setImmediate(() => {
    console.log('8. setImmediate inside I/O');
  });
});

console.log('9. Sync end');
