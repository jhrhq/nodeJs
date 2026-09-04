Nodejs relies on single Javascript execution thread backed by c++ libraries (libuv, v8) to deliver high-throughput, non-blocking asynchronous I/O.

## The Architecture: V8, Nodejs APi and lubuv

Nodejs consists of 3 core components that manage asynchronous execution
`+-------------------------------------------------------------+
|                      Your JS Code                           |
+-------------------------------------------------------------+
|                        Node.js API                          |
|             (fs, net, http, child_process, etc.)            |
+------------------------------+------------------------------+
|          V8 Engine           |            libuv             |
|   (Call Stack, Memory Heap)  | (Event Loop, Worker Pool)    |
+------------------------------+------------------------------+
`

1. V8 Engine: Compiles Javascript to machine code, manages the object Memory Heap(where objects live), and handles the single threaded Call Stack(where function calls are pushed and popped).

2. Node.js API: Bridges Javascript calls to low-level system operation.

3. libuv: A C library that provides the Event Loop mechanism and manages background threads(the Thread Pool) for heavy or blocking system operations like disk I/O and DNS(Domain Name System) lookup.

The 6 Phases of the Node.js Event Loop
The Event Loop continuosly cycles through 6 specific phases in a strict sequential loop.

`┌───────────────────────────┐
┌─>│          timers           │ ───> setTimeout(), setInterval()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │ ───> TCP errors, OS-level I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │ ───> Internal Node.js usage only
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           poll            │ ───> Fetch new I/O events, execute I/O callbacks
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │           check           │ ───> setImmediate()
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──│      close callbacks      │ ───> socket.on('close')
   └───────────────────────────┘
`

1. `timers`

- What happens: Executes callbacks scheduled by `setTimeout()` and `setInterval()` whose threshold timers have expired.
- Details: Node.js checks a min-heap data structure to see any timer has reached its scheduled delay. If so, it moves its callback to call stack for execution.

2. `pending callbacks`

- What happens: Executes I/O callbacks that were differed from the previous iteration.
- Detail: If an operating system operation (like a TCP socket error such as ECONNREFUSED) finishes while the loop was busy elsewhere, the OS pushes the callbacks to this queue to be processed on the next turn.

3. `idle, prepare`

- What happens: Used internally by Node.js for engine house keeping and setup before before starting the polling phase. Developers do not directly interact with or write code for this phase.

4. `poll`

- What happens: The most important phase. It fetches new I/O events (reading files, incoming network requests, database responses) and executes their callbacks.
- Behavior:
  - If the poll queue is not empty, Nodejs iterates through the queue and executes callbacks synchronously util the queue is exhausted or a hard limit is reached.
  - If the poll queue is empty:
    - If `setImmediate()` callbacks are scheduled, Node.js ends the poll phase immediately and jumps to the `check` phase.
    - If no `setImmediate()` callbacks exists, Node.js blocks and waits inside the poll for new I/O events to arrive, or until a timer is ready to fire.

5. `check`

- What happenes: Executes callbacks registered with `setImmediate()`
- Details: `setImmediate()` allows you to run callback immediately afte the poll phase completes, guranteeing it fires before any new timers set during that loop iteration.

6. `close callbacks`

- What happens: Handles cleanup callbacks for handles or sockets that were closed abraptly.
- Detail: For example, when a socket stream emits `.on('close', fn)` its callback executes in this phase.

## MicroTasks vs MacroTasks: The priority interrupters

In addition to the 6 main Event Loop phases (which process **macrotasks**), Node.js maintains two high-priority **microtask queues**:

1. `process.nextTick()` Queue: Highest priority in the entire runtime.
2. Promise Queue: Standard microtasks (`Promise.then()`, `async/await`).

## The Interruption Rule

Whenever the call stack empties between two callback in the same phase, or when transitioning between two phases, Node.js pauses the Event Loop and completly flushes:

1. All functions in the `process.nextTick` **queue**.
2. All promises in the **Promise Microtask Queue**.

`Main Call Stack Empties
      │
      ▼
Flushes ALL process.nextTick() callbacks
      │
      ▼
Flushes ALL Promise / Microtask callbacks
      │
      ▼
Resumes Event Loop to next Macrotask / Phase`

## Code Execution Breakdown

To understand how the phases and microtask queues execute, consider this execution example:

```js
import fs from "node:fs";

console.log("1.Sync start");

setTimeout(() => {
  console.log("2. setTimeout 0ms (Timers Phase)");
}, 0);

setImmediate(() => {
  console.log("3. setImmediate (Check phase)");
});

Promise.resolve().then(() => {
  console.log("4. promise microTask");
});

process.nextTick(() => {
  console.log("5. process.nextTick microTask");
});

fs.readFile(import.meta.filename, () => {
  console.log("6. I/O callback (poll phase)");

  setTimeout(() => {
    console.log("7. setTimout inside I/O");
  }, 0);

  setImmediate(() => {
    console.log("8. setImmediate inside I/O");
  });
});

console.log("9. Sync end");
```

## Step-by-Step Execution Output:

`

1. Sync Start
2. Sync End
3. process.nextTick microTask
4. Pormise microtask
5. setTimeout 0ms (Timers phase)
6. setImmediate (Check Phase)
7. I/O callback (Poll Phase)
8. setImmediate inside I/O
9. setTimout inside I/O
   `

## Why does it print in this exact order

1. Synchronous Execution:
   `1. Sync start` and `9. Sync` end run immediately on the **Main Call Stack**
2. Flushing Microtasks:
   Before movinng to any Event Loop phase, Node.js checks microTasks. `process.nextTick` runs first(`5. process.nextTick microTask`), followed by resolved promises (`4. Pormise microtask`)
3. Top-Level Phases:
   - Timers Phase: `setTimout 0ms` is ready and fires (`2. setTimeout 0ms`)
   - Poll Phase: waiting for the file read operation to complete.
   - Check Phase: `setImmediate` fires (`3. setImmediate`)

4. Inside the I/O Callback(`6. I/O callback (Poll Phase)`)
   When `fs.readfile` completes, its callback runs inside the **Poll Phase**. Inside this callback both a `setTimeout(...)` and `setImmediate(...)` are scheduled.
   - Node.js finishes the Poll Phase and proceeds to the next phase in sequence: the **Check Phase**.
   - Therefore, `8. setImmediate inside I/O` runs before `7. setTimout inside I/O`, because the check phase happens directly afte the Poll Phase!

## V8 Engine and Memory Management

1. Memorey Heap Vs. Call Stack:
   - Call Stack: Primite Values, stack frames and local variables pointers (LIFO structure).
   - Memory Heap: Unstructured memory space where objects, arrays and functions are dynamically allocated.

2. Garbage Collection Algorithms:
   - Scavenge (Young Generation): Fast, frequent collection targeting short-lived objects using a two-space copy algorithm (From-Space and To-Space).
   - Mark-Sweep / Mark-Compact (Old Generation): Slower, full collection targeting long-lived objects. It identifies reachable objects (Marking), deletes unreachable ones (Sweeping), and defragments memory (Compacting).

3. Common Memory Leaks in Node.js:

- Global Variables: Variables attached to `global` or left unused.
- Uncleaned EventEmitters: Forgetting to run `removeListener()` or `.off()` on long-lived event emitters.
- Closures: Keeping references to large objects in outer scopes that never get garbage collected
