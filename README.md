# ReactI18nRouting
> 🌐 Abstraction layer over React-Router to create i18n routes easily

[![npm version](https://img.shields.io/npm/v/@foes/react-i18n-routing.svg?style=flat-square)](https://www.npmjs.com/package/@foes/react-i18n-routing)
[![Build Status](http://img.shields.io/travis/FriendsOfECMAScript/ReactI18nRouting/master.svg?style=flat-square)](https://travis-ci.org/FriendsOfECMAScript/ReactI18nRouting)
[![NPM Status](http://img.shields.io/npm/dm/@foes/react-i18n-routing.svg?style=flat-square)](https://www.npmjs.org/package/@foes/react-i18n-routing)
[![devDependency Status](https://img.shields.io/david/FriendsOfECMAScript/ReactI18nRouting.svg?style=flat-square)](https://david-dm.org/FriendsOfECMAScript/ReactI18nRouting#info=dependencies)

## 🎩 Features

- 🔗 Abstraction layer over [React-Router][1]
- 💡 Built-in i18n routing strategies
- 🎛️ Decoupled from state handling strategies
- 🚀 1 minute config

## 🤔 Why

There are robust solutions that they have become in standard solutions to usual problems in *React* ecosystem such as
**routing** with *React-Router* and its all related packages.
These libraries make our life more easy building apps but, what happens when we need to translate our routing system? In this case, we think that we need some other library over *React-Router* to join with any **i18n**
system so, we have created the *ReactI18nRouting*.

This library aims to provide all the needed to make the internationalization of the routes as easy as possible.
We truly trust in the *Single Responsibility Pattern* so, we have designed the library following the UNIX popular
concept:<br>*DOTADIW, or "Do One Thing and Do It Well"*.

## 📟 Install

The recommended and the most suitable way to install is through *Yarn*.
```shell
$ yarn add @foes/react-i18n-routing
```
Or alternatively, through *NPM*.
```shell
$ npm install --save @foes/react-i18n-routing
```  

## 📓 Documentation

All the documentation is stored in the `docs` folder.

[Show me the docs!](docs/index.md)

## 💪 Contributing

This library follows the modern JavaScript coding standards, so pull requests need to pass the [ESLint][2] and
[Prettier][3]. This task can be very boring but, in the `package.json` there are some useful
npm-scripts that becomes this process simpler and faster.
```bash
$ yarn cs           # or npm run cs
```
There is also a policy for contributing to this library. Pull requests must be explained step by step to make the
review process easy in order to accept and merge them. New methods or code improvements must come paired with
tests. We are using [Jest][4] test framework for that purpose; and over that, to make our life easier, we are using
[React Testing Library][5].
```bash
$ yarn test         # or npm test
```

## 👪 Credits

This library is created and maintained by:
>
**@benatespina** - [benatespina@gmail.com](mailto:benatespina@gmail.com)<br>
**@gorkalaucirica** - [gorka.lauzirika@gmail.com](mailto:gorka.lauzirika@gmail.com)<br>
**@mktoast** - [mikeltuesta@gmail.com](mailto:mikeltuesta@gmail.com)

## 📜 Licensing Options

[![License](https://img.shields.io/badge/License-MIT-yellowgreen.svg?style=flat-square)](https://github.com/FriendsOfECMAScript/ReactI18nRouting/blob/master/LICENSE)

[1]: https://github.com/ReactTraining/react-router
[2]: http://eslint.org/
[3]: https://prettier.io/ 
[4]: https://facebook.github.io/jest/
[5]: https://github.com/kentcdodds/react-testing-library
