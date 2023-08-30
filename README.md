# React.js Typescript application starter

Usage: create fast prototypes, solve test tasks.

## Features:
* You can write Typescript or Javascript code with the latest JS features.
* Babel is used for Typescript transpilation. Typescript compiler is used for the type checking only.
* ESLint for linting Typescript and Javascript code.
* Auto code formatting with Prettier.
* Fully controllable build process with Webpack (v5). There are the development, production configs. The common part is in the common config.
* Webpack dev server with hot reloading
* Production optimized build
* Client-side routing (react-router v6)
* Material UI toolkit (v5)
* "api" sub-dir contains code for working with a backend. Axios is used.
* Login and Main page skeletons. Dummy implementation for handling the authentication has already been added.
* Jest configured. Tests can be written in Typescript.
* Storybook configured.

## Webpack Vs Vite

This starter uses Webpack. So, the dev server starts slowly compared to Vite.   
The same is true also for code changes and live-reloading.   
If you'd like to try the same starter, but with Vite, see the following link:    
[react-ts-vite-starter](https://github.com/azakharo/react-ts-vite-starter)

## Quick start

First install dependencies:

```sh
npm install
```

To run in the development mode with hot module reloading:

```sh
npm start
```

That command opens http://localhost:4000 page in your browser.


To create a production build:

```sh
npm run build
```
See "build" folder for results.
