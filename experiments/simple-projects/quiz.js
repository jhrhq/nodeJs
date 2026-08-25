import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const FILE_NAME = 'quiz.json';
const filepath = path.join(import.meta.dirname, FILE_NAME);

function getQuestions() {
  const data = fs.readFileSync(filepath, 'utf-8');
  return JSON.parse(data);
}

const questions = getQuestions();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('👋 Welcome to the quiz app!\n');

let score = 0;
let index = 0;

function askQuestion() {
  if (index < questions.length) {
    const currentQuestion = questions[index];
    console.log(`\n❔ ${currentQuestion.question}`);
    currentQuestion.options.forEach((item, index) => console.log(`\n🔘 ${index + 1} ${item}`));
    rl.question('\n✍️ Your answer(number) ', (answer) => {
      const answerNumber = parseInt(answer) - 1;
      if (currentQuestion.answer === String(answerNumber)) {
        console.log('\n✅ Correct!');
        score++;
      } else {
        console.log(`\n🚫 Wrong! The correct answer was ${currentQuestion.correctAnswer}`);
      }
      index++;
      askQuestion();
    });
  } else {
    console.log(`\n🎯 Total score: ${score}`);
    rl.close();
  }
}

askQuestion();
