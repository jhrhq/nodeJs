import fs from 'node:fs';
import path from 'node:path';
import { stdin as input, stdout as output } from 'node:process';
import readline from 'node:readline';

const FILE_NAME = 'tasks.json';
const filePath = path.join(import.meta.dirname, FILE_NAME);

if (!fs.existsSync(FILE_NAME)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

const rl = readline.createInterface({ input, output });

const loadTasks = () => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const saveTasks = (tasks) => {
  fs.writeFileSync(filePath, JSON.stringify(tasks, 2, null));
};

const showMenu = () => {
  console.log('\n======== Todo Application ========\n');
  console.log('1. 📝 Add Task');
  console.log('2. 📋 View Tasks');
  console.log('3. ❌ Delete Task');
  console.log('4. 🔚 Exit\n');
  rl.question('🔘 Choose an option: ', handleMenu);
};

function handleMenu(option) {
  switch (option) {
    case '1':
      rl.question('🗒️ Enter Task: ', (task) => {
        const tasks = loadTasks();
        tasks.push({ done: false, title: task });
        console.log('✅ Task added successfully!');
        saveTasks(tasks);
        showMenu();
      });

      break;

    case '2': {
      const tasks = loadTasks();
      if (tasks.length === 0) {
        console.log('🚫 No task found.');
      } else {
        tasks.forEach((task, index) => console.log(`${index + 1} ${task.title}`));
      }
      showMenu();

      break;
    }

    case '3': {
      const alltasks = loadTasks();
      if (alltasks.length === 0) {
        console.log('🚫 No task found.');
        showMenu();
        return;
      }
      alltasks.forEach((task, index) => console.log(`${index + 1} ${task.title}`));
      showMenu();
      rl.question('🗒️ Enter Task Number to Delete: ', (taskNumber) => {
        const index = parseInt(taskNumber - 1);
        if (index >= 0 && index < alltasks.length) {
          alltasks.splice(index, 1);
          saveTasks(alltasks);
          console.log('✅ Task deleted successfully.');
        } else {
          console.log('🚫 Invalid task number.');
        }
        showMenu();
      });
      break;
    }

    case '4':
      console.log('🔚 Exiting...');
      rl.close();

      break;

    default:
      console.log('🚫 Invalid option. Please try again.');
      showMenu();
  }
}

showMenu();
