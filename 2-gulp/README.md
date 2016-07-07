# Projekt-Setup mit Gulp

Mini TypeScript project mit Gulp, SASS, Browserify, Browsersync, Mocha, Chai.

## Install

First, install [typings](https://github.com/typings/typings) if you don't have it yet.

```sh
npm install typings -g
```

Second, clone and install project as

```sh
npm install
```

## Commands

After that you can build the project and start a default browser automatically by

```sh
npm run build:dev
```

The application is available at [http://localhost:3000/](http://localhost:3000/). TypeScript and SASS files are watched continuously and the application gets updated in the browser when you make any changes.

For tests run

```sh
npm run test
```