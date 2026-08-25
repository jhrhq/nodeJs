import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline/promises';

const rl = readline.createInterface({ input, output });

const answer = await rl.question('Enter the city name?');

const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
  body: JSON.stringify({ title: answer }),
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
});
const val = await res.json();

console.log('thank you for your answer', val);

rl.close();
