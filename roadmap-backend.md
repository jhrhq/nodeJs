# Node.js Backend Developer Mastery Checklist

## Phase 1: Core Node.js Architecture

- [ ] **The Event Loop & Phased Execution**
  - [ ] `timers` phase (`setTimeout`, `setInterval`)
  - [ ] `pending callbacks` phase (I/O callbacks deferred from previous loop)
  - [ ] `idle, prepare` phase (internal Node.js usage)
  - [ ] `poll` phase (fetching new I/O events, executing I/O callbacks)
  - [ ] `check` phase (`setImmediate` callbacks)
  - [ ] `close callbacks` phase (`socket.on('close')`)
- [ ] **Microtasks vs. Macrotasks**
  - [ ] `process.nextTick()` queue (highest priority microtask)
  - [ ] Promise job queue (standard microtasks)
  - [ ] Macrotasks (`setTimeout`, `setImmediate`, I/O execution)
- [ ] **V8 Engine & Memory Management**
  - [ ] Memory heap vs. call stack mechanics
  - [ ] Garbage collection algorithms (Scavenge vs. Mark-Sweep)
  - [ ] Heap snapshots and identifying memory leaks

---

## Phase 2: Essential Core Modules

- [ ] **`events` (EventEmitter)**
  - [ ] `.on()`, `.once()`, `.emit()`, and `.removeListener()`
  - [ ] Listener order and synchronous callback execution
  - [ ] `maxListeners` limit and leak warnings
- [ ] **`fs` & `path`**
  - [ ] Synchronous vs. Asynchronous (`fs/promises`) methods
  - [ ] Directory operations and file metadata (`fs.stat`)
  - [ ] Path resolution (`path.join`, `path.resolve`, `path.extname`)
- [ ] **`stream` & `buffer`**
  - [ ] Binary data handling with `Buffer` (Allocations, Encodings)
  - [ ] Stream types: `Readable`, `Writable`, `Duplex`, `Transform`
  - [ ] Backpressure management, `.pipe()`, and `pipeline()`
- [ ] **`http` & `https`**
  - [ ] Low-level server initialization (`http.createServer`)
  - [ ] Request/Response parsing without frameworks
  - [ ] Status codes and HTTP headers manipulation
- [ ] **`child_process` & `worker_threads`**
  - [ ] Process spawning: `exec`, `execFile`, `spawn`, `fork`
  - [ ] Inter-Process Communication (IPC)
  - [ ] Multi-threaded operations with `worker_threads` and `SharedArrayBuffer`

---

## Phase 3: APIs & Web Frameworks

- [ ] **Frameworks (Express.js / Fastify)**
  - [ ] Middleware pipeline execution and pattern design
  - [ ] Route parameterization and query string parsing
  - [ ] Centralized error-handling middleware
- [ ] **API Paradigms**
  - [ ] **REST:** Resource design, idempotency, HTTP verbs
  - [ ] **GraphQL:** Schemas, resolvers, mutations, N+1 query problem, `DataLoader`
  - [ ] **WebSockets:** Full-duplex connections (`ws`, `Socket.io`), heartbeats, room broadcasting
- [ ] **Data Validation**
  - [ ] Schema declaration with `Zod` or `Joi`
  - [ ] Request body, query, and path parameter sanitization

---

## Phase 4: Databases & Caching

- [ ] **Relational Databases (PostgreSQL / MySQL)**
  - [ ] Normalization (1NF, 2NF, 3NF) vs. Denormalization
  - [ ] Index types (B-Tree, Hash, GIN) and Query Optimization (`EXPLAIN ANALYZE`)
  - [ ] ACID compliance, transactions, and isolation levels
- [ ] **ORMs & Query Builders**
  - [ ] Migrations and schema management
  - [ ] Query builders (`Knex.js`, `Drizzle ORM`) vs. Full ORMs (`Prisma`, `TypeORM`)
- [ ] **NoSQL Databases (MongoDB)**
  - [ ] Document relationships (Embedding vs. Referencing)
  - [ ] Aggregation Pipelines (`$match`, `$group`, `$lookup`)
- [ ] **In-Memory Caching (Redis)**
  - [ ] Cache strategies (Cache-Aside, Write-Through)
  - [ ] Data structures (Strings, Hashes, Sets, Sorted Sets)
  - [ ] Key expiration (TTL), eviction policies, and Pub/Sub mechanism

---

## Phase 5: Authentication & Security

- [ ] **Authentication Patterns**
  - [ ] Password hashing algorithms (`argon2`, `bcrypt`)
  - [ ] Session-based authentication (Session stores, stateful)
  - [ ] Token-based authentication (JWTs, stateless)
  - [ ] Access and Refresh Token rotation mechanics
  - [ ] OAuth 2.0 & OpenID Connect (OIDC) flows
- [ ] **Security Best Practices**
  - [ ] Protection against OWASP Top 10 (XSS, CSRF, Injection attacks)
  - [ ] Security headers using `helmet`
  - [ ] CORS policies and preflight requests
  - [ ] API rate limiting and brute-force protection

---

## Phase 6: Architecture & Background Processing

- [ ] **Application Architecture**
  - [ ] Layered Architecture (Controller -> Service -> Repository)
  - [ ] Dependency Injection and Inversion of Control
  - [ ] Monolith vs. Microservices vs. Serverless models
- [ ] **Message Queues & Background Jobs**
  - [ ] Producer-Consumer pattern
  - [ ] Redis queues using **BullMQ** (delayed jobs, concurrency, retries)
  - [ ] Message Brokers (**RabbitMQ**, **Apache Kafka**) for event-driven microservices

---

## Phase 7: Testing, Production & Operations

- [ ] **Testing**
  - [ ] Unit testing (`Vitest`, `Jest`, or `node:test`)
  - [ ] Integration & API testing with `Supertest`
  - [ ] Mocks, Stubs, and Test DB setups
- [ ] **Profiling & Debugging**
  - [ ] Node Inspector (`node --inspect`)
  - [ ] CPU Profiling (Flamegraphs)
  - [ ] Heap dumps for tracking down memory leaks
- [ ] **Deployment & Observability**
  - [ ] Containerization with **Docker** (Multi-stage builds, `.dockerignore`)
  - [ ] Process Management with **PM2** (Cluster mode)
  - [ ] Structured logging with `Pino` or `Winston`
