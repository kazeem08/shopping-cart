## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.


# Topic-subscription servers

This consist of two servers:
- publisher-app handles SUBSCRIBE and PUBLISH (running on port 8000)
- subscriber-app receives broadacst from the topic-subscribe app (running on port 9000)
 
## Features

- Uses [npm](https://www.npmjs.com/)
- Nest + MongoDB ([Mongoose](http://mongoosejs.com/))
- Load environment variables from .env

## Requirements

- [Node](https://nodejs.org/en/download/current/)
- [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

## Getting Started

#### Clone the repo and make it yours:

```bash
git clone https://github.com/kazeem08/shopping-cart.git
```

```
cd shopping-cart
```

```
rm -rf .git
```

#### Install dependencies:

#give permission to execute file 
```bash
chmod u+x dependencies.sh
```

```bash
./dependencies.sh
```

#### Set environment variables:

- set environment variables for each application by using the env.sample.txt as a guide

## Running the application

The command below starts the two applications listening on port 8000 and 9000

```bash
chmod u+x dependencies.sh
```

```bash
./start-server.sh
```

## Test

```bash
#cd into individual app and run the command below 
npm run test
```