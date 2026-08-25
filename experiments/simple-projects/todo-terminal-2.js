import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';

const FILE_NAME = 'tasks.json';

const filePath = path.join(import.meta.dirname, FILE_NAME);
/**
 * 1. print options in terminal
 * 2. select any option
 * 3. create task
 * 4. list task
 * 5. delete task
 * 6. exit from readline
 */

if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function showMenu() {
  console.log('\n================ Todo Application ================\n');
  console.log('1. 📝 Add Task');
  console.log('2. 📋 View Tasks');
  console.log('3. ❌ Delete Task');
  console.log('4. 🔚 Exit\n');
  rl.question('🔘 Choose an option: ', handleOptions);
}

function loadTasks() {
  const tasks = fs.readFileSync(filePath);
  return JSON.parse(tasks);
}

function saveTasks(tasks) {
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
}

function viewAllTasks() {
  const allTasks = loadTasks();
  if (allTasks.length === 0) {
    showMenu();
    return;
  } else {
    allTasks.forEach((task, index) => console.log(`📋 ${index + 1} ${task.title}`));
  }
}

function handleOptions(option) {
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
    case '2':
      viewAllTasks();
      showMenu();
      break;
    case '3':
      viewAllTasks();

      rl.question('🗒️ Enter Task Number to Delete Task: ', (taskNumber) => {
        const tasklist = loadTasks();
        const index = parseInt(taskNumber) - 1;

        if (index >= 0 && index <= tasklist.length) {
          tasklist.splice(index, 1);
          saveTasks(tasklist);
          console.log('✅ Task deleted successfully.');
        } else {
          console.log('🚫 Invalid task number.');
        }
        showMenu();
      });
      break;
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
