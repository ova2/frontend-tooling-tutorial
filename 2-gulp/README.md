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

After that you can build the project for development with

```sh
npm run build:dev
```

The application starts automatically and is available at [http://localhost:3000/](http://localhost:3000/). TypeScript, SASS and HTML files are watched continuously and the application gets updated in the browser when you make any changes.

The following command builds the project for production. The delivered project can be found below the `dist` folder.

```sh
npm run build:prod
```

Use this command to run tests with Mocha runner:

```sh
npm run test
```