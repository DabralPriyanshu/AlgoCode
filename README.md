<img width="1111" height="1339" alt="Code architecture" src="https://github.com/user-attachments/assets/abc3a50d-35f8-46a4-aaf1-097a07d674a8" />



# 🧠 Online Code Judge – Microservices Architecture

A **distributed Online Code Evaluation System** built using **Node.js microservices**.
The platform allows users to submit solutions for coding problems and receive **real-time evaluation results**.

The architecture separates responsibilities across multiple services to ensure **scalability, reliability, and maintainability**.

---

# 📦 System Architecture

The system is composed of four main backend services:

1. **Problem Admin Service**
2. **Submission Service**
3. **Evaluator Service**
4. **WebSocket Service**

Supporting infrastructure includes:

* **Redis** (Queue + Cache)
* **MongoDB** (Database)
* **Docker + Dockerode** (Secure Code Execution)
* **Socket.IO** (Real-time communication)

---

# 🚀 Tech Stack

## Backend Services

| Service               | Framework           | Language   |
| --------------------- | ------------------- | ---------- |
| Problem Admin Service | Express             | Node.js    |
| Submission Service    | Fastify             | Node.js    |
| Evaluator Service     | Express             | TypeScript |
| WebSocket Service     | Express + Socket.IO | Node.js    |

---

## Infrastructure

| Technology  | Purpose                                   |
| ----------- | ----------------------------------------- |
| Redis       | Queue system + WebSocket connection cache |
| MongoDB     | Persistent database                       |
| Docker      | Secure sandbox environment                |
| Dockerode   | Programmatic container management         |
| Socket.IO   | Real-time communication                   |
| Redis Queue | Job processing                            |

---

# 🧩 Services

---

# 1️⃣ Problem Admin Service

Responsible for **managing coding problems** and providing problem metadata to other services.

## Responsibilities

* Create coding problems
* Update problem details
* Store test cases
* Fetch problem metadata
* Provide problem data to Submission Service

## Tech

* Express
* Node.js
* MongoDB

---

# 2️⃣ Submission Service

Acts as the **central orchestrator** of the system.

## Responsibilities

* Accept user submissions
* Fetch problem details
* Create submission entry
* Push submission jobs to Redis queue
* Receive evaluation results
* Update submission status
* Notify WebSocket service

## Tech

* Fastify
* Node.js
* Redis
* MongoDB

---

# 3️⃣ Evaluator Service

Responsible for **executing and evaluating submitted code** securely.

## Responsibilities

* Consume jobs from submission queue
* Run code inside Docker containers
* Execute test cases
* Compare outputs
* Generate evaluation results
* Push results to evaluation queue

## Tech

* Express
* TypeScript
* Dockerode
* Redis Queue

---

# 4️⃣ WebSocket Service

Handles **real-time communication with the client**.

## Responsibilities

* Maintain active client connections
* Map `userId → socketId`
* Send evaluation updates to users
* Handle socket connections

## Tech

* Express
* Socket.IO
* Redis Cache

---

# 🔄 Submission Flow

### Step 1

Client sends submission request to **Submission Service**.

```
POST /submit
```

Example payload:

```
{
  "userId": "123",
  "problemId": "abc",
  "code": "print('Hello World')",
  "language": "python"
}
```

---

### Step 2

Submission Service sends a **synchronous request** to Problem Admin Service to fetch problem details.

---

### Step 3

Problem Admin Service queries **MongoDB** to retrieve problem metadata and test cases.

---

### Step 4

Problem Admin Service sends the problem details back to the Submission Service.

---

### Step 5

Submission Service creates a **submission record in MongoDB**.

---

### Step 6

Submission Service pushes the submission payload to the **Redis Submission Queue**.

---

### Step 7

Submission Service sends an immediate response to the client confirming submission.

---

### Step 8

Evaluator Service consumes the job from the **Redis Submission Queue**.

---

### Step 9

Evaluator Service:

* Runs the code inside a **Docker container**
* Executes test cases
* Compares expected output
* Generates a result

The result is then pushed to the **Evaluation Queue**.

---

### Step 10

Submission Service consumes the evaluation result from the **Evaluation Queue**.

---

### Step 11

Submission Service updates the submission status in **MongoDB**.

---

### Step 12

Submission Service notifies the **WebSocket Service** with updated execution status.

---

### Step 13

WebSocket Service sends the execution result to the **client in real-time**.

---

# 🔐 Code Execution Isolation

User code is executed inside **Docker containers** to ensure:

* Security
* Resource isolation
* Controlled execution
* Language runtime flexibility

Example:

```
Python Container
Java Container
C++ Container
Node.js Container
```

Docker containers are created and managed using **Dockerode**.

---

# 📡 Redis Usage

Redis is used in two ways:

### 1️⃣ Queue System

* Submission Queue
* Evaluation Queue

Used for asynchronous job processing.

### 2️⃣ WebSocket Cache

Stores:

```
userId → socketId
```

This allows the system to send real-time updates to the correct user.

---

# 🗄️ Database

**MongoDB** stores:

### Problems

```
title
description
difficulty
testCases
constraints
```

### Submissions

```
userId
problemId
language
code
status
result
executionTime
```

---

# 📂 Project Structure (Example)

```
project-root
│
├── problem-admin-service
│   ├── controllers
│   ├── routes
│   ├── models
│   └── server.js
│
├── submission-service
│   ├── controllers
│   ├── queues
│   ├── services
│   └── server.js
│
├── evaluator-service
│   ├── containers
│   ├── runners
│   ├── queueWorkers
│   └── server.ts
│
├── websocket-service
│   ├── socket
│   └── server.js
│
└── docker
```

---

# 🐳 Docker Usage

Docker is used to:

* Execute untrusted user code safely
* Prevent system compromise
* Limit CPU and memory usage

Example execution flow:

```
User Code → Docker Container → Test Cases → Result
```

---

# ⚡ Key Features

* Microservices architecture
* Asynchronous job processing
* Real-time code execution updates
* Secure code execution using Docker
* Scalable queue-based system
* Redis-based messaging
* Fast API layer using Fastify
* Type-safe evaluator service using TypeScript

---

# 📈 Scalability

The system can scale independently:

* Multiple **Evaluator Service instances**
* Multiple **Submission Service instances**
* Redis queue ensures load distribution
* Docker containers isolate executions

---

# 🛠 Future Improvements

* Kubernetes deployment
* Rate limiting
* Multi-language execution support
* Submission analytics
* Code plagiarism detection
* Distributed worker scaling

---

# 👨‍💻 Author

Priyanshu Dabral

---

# ⭐ If you like this project

Give the repository a **star ⭐** and feel free to contribute.
