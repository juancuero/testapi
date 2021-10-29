# Prueba de conocimientos desarrollador Backend - Juan Cuero

This application is generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

## Installation

Clone the repository

    git clone https://github.com/juancuero/testapi.git

Switch to the repo folder

    cd testapi

Copy the example env file and make the required configuration changes in the .env file

    cp .env.example .env

## Install dependencies

By default, dependencies were installed when this application was generated.
Whenever dependencies in `package.json` are changed, run the following command:

```sh
npm install
```

To only install resolved dependencies in `package-lock.json`:

```sh
npm ci
```

## Run migrations

```sh
npm run migrate
```

## Run the application

```sh
npm start
```

You can also run `node .` to skip the build step.

Open http://127.0.0.1:3000 in your browser.

## Tests

```sh
npm run test
```
