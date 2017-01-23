# Norsound.com

This is the home of [norsound.com](https://norsound.com). Powered by [Express](https://expressjs.com).

### Running in development
* You'll need [Node](https://nodejs.org), [Yarn](https://yarnpkg.com) and [Heroku toolbelt](https://toolbelt.heroku.com) installed to run this application in development.

```shell
yarn install
yarn start
```

### Running in production
* This application has been designed and configured to work with [Heroku](https://heroku.com).
* `Procfile` is detected by Heroku, so any web processes and workers should be defined there.
* Assets are minified, compiled and versioned with [Gulp](http://gulpjs.com).
