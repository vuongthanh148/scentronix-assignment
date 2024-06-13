# Scentronix Assignment Server Checker

## Overview

The Scentronix Assignment Server Checker is an application developed using NestJS. Its primary function is to analyze a collection of web servers and return the one that is currently online and has the lowest priority. The project demonstrates the combined use of several technologies such as NestJS, TypeScript, Axios for handling HTTP requests, Swagger for API documentation, and Jest for testing purposes.

## Features

- Check all server status and return online server with lowest priority.
- Make parallel request with timeout restriction by using Axios and forkJoin function from RxJS.
- Use NestJS Logger for logging function.
- Use Swagger for API documentation.
- Conducting unit tests on services and controllers utilizing Jest

## Tech Stack

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- **Axios**: A promise-based HTTP client for making HTTP requests.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Swagger**: A powerful tool for designing, building, and documenting RESTful APIs, enhancing developer productivity and enabling API visibility.

## Project Structure

```
src
├── app.module.ts
├── config
│   ├── app-config.type.ts
│   ├── app.config.ts
│   └── config.type.ts
├── data
│   └── server-list.ts
├── main.ts
├── modules
│   └── server-checker
│       ├── controllers
│       │   ├── server-checker.controller.spec.ts
│       │   └── server-checker.controller.ts
│       ├── domain
│       │   └── server.ts
│       ├── server-checker.module.ts
│       └── services
│           ├── server-checker.service.spec.ts
│           └── server-checker.service.ts
└── utils
    ├── constants.ts
    ├── deep-resolver.ts
    ├── serializer.interceptor.ts
    ├── types
    │   ├── deep-partial.type.ts
    │   ├── maybe.type.ts
    │   ├── nullable.type.ts
    │   ├── or-never.type.ts
    │   └── pagination-options.ts
    ├── validate-config.ts
    └── validation-options.ts

```

## Getting Started

### Prerequisites

- Node.js (>= 16.x)
- npm (>= 8.x)

### Installation

#### Clone the repository

```bash
git clone https://github.com/vuongthanh148/scentronix-assignment.git
cd backend
cp .env.example .env
```

#### Install the dependencies

```bash
npm install
```

#### Running the application

##### Run on your IDE

```bash
npm run start:dev
```

##### Run with Docker

```bash
docker-compose up -d
```

## Links

- Application: <http://localhost:3456>
- Swagger (API docs): <http://localhost:3456/docs>

### Testing

Request

```shell
curl --location 'http://localhost:3456/api/v1/server-checker' --header 'accept: application/json' --header 'Content-Type: application/json'
```

Response:

```json
{ "url": "http://app.scnt.me", "priority": 3 }
```

## Testing

### Running test

```bash
npm run test
```

### Test coverage

```
----------------------------------------|---------|----------|---------|---------|-------------------
File                                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------------------------------------|---------|----------|---------|---------|-------------------
All files                               |   32.37 |    15.38 |   54.16 |   31.49 |
 src                                    |       0 |      100 |       0 |       0 |
  app.module.ts                         |       0 |      100 |     100 |       0 | 1-16
  main.ts                               |       0 |      100 |       0 |       0 | 1-54
 src/config                             |       0 |        0 |       0 |       0 |
  app.config.ts                         |       0 |        0 |       0 |       0 | 1-43
 src/data                               |     100 |      100 |     100 |     100 |
  server-list.ts                        |     100 |      100 |     100 |     100 |
 src/modules/server-checker             |       0 |      100 |     100 |       0 |
  server-checker.module.ts              |       0 |      100 |     100 |       0 | 1-12
 src/modules/server-checker/controllers |     100 |      100 |     100 |     100 |
  server-checker.controller.ts          |     100 |      100 |     100 |     100 |
 src/modules/server-checker/domain      |     100 |      100 |     100 |     100 |
  server.ts                             |     100 |      100 |     100 |     100 |
 src/modules/server-checker/services    |    93.1 |       75 |    90.9 |    92.3 |
  server-checker.service.ts             |    93.1 |       75 |    90.9 |    92.3 | 38-39
 src/utils                              |       0 |        0 |       0 |       0 |
  deep-resolver.ts                      |       0 |        0 |       0 |       0 | 2-30
  serializer.interceptor.ts             |       0 |      100 |       0 |       0 | 1-14
  validate-config.ts                    |       0 |        0 |       0 |       0 | 1-22
  validation-options.ts                 |       0 |        0 |       0 |       0 | 1-33
----------------------------------------|---------|----------|---------|---------|-------------------
```

## Logic

### Service Layer

Service ServerCheckerService handles the core logic of the application:

- `checkServerStatus`: Send multiple HTTP GET requets to different servers in parallel to get online servers and return one with lowest priority

### Controller Layer

Controller ServerCheckerController handles incoming HTTP GET requests and delegates the logic to the ServerCheckerService.

### Unit Tests

Unit tests are written using Jest and axios-mock-adapter for mocking HTTP requests.

To run the tests, use:

```bash
npm run test:cov -> For Test Coverage report
```
