# React i18n routing
> Provides components and functions to make i18n routing React apps with ease.

[![npm version](https://img.shields.io/npm/v/@foes/react-i18n-routing.svg?style=flat-square)](https://www.npmjs.com/package/@foes/react-i18n-routing)
[![Build Status](http://img.shields.io/travis/FriendsOfECMAScript/ReactI18nRouting/master.svg?style=flat-square)](https://travis-ci.org/FriendsOfECMAScript/ReactI18nRouting)
[![NPM Status](http://img.shields.io/npm/dm/@foes/react-i18n-routing.svg?style=flat-square)](https://www.npmjs.org/package/@foes/react-i18n-routing)
[![devDependency Status](https://img.shields.io/david/FriendsOfECMAScript/ReactI18nRouting.svg?style=flat-square)](https://david-dm.org/FriendsOfECMAScript/ReactI18nRouting#info=dependencies)

## Language strategies

All language strategies use the following API:

**`localeFromLocation(location)`**

Resolves current locale based on [location object](https://developer.mozilla.org/en-US/docs/Web/API/Location)

**`formatIntlRoute(routeName, {locale, ...params)`**

Generates route based on route name and locale (if none given, default will be used). Rest of parameters are passed as
arguments to `formatRoute`

Some **language strategies** are already **available**

### Default unprefixed

Prefixes all paths with locales but the locale set as default

### Domain based

Based on domain resolves current locale

## Generating routing config

This library has been built on top of react-router-config, and each language strategy provides a helper to transform
the intl routing to valid react-router-config routing.

## Route internationalization

A react component is available to transform a given route name and its params to valid a route.

```js
<FormattedLink name="route_name" params={{param1: 'value'}}/>
```

### BrowserIntlProvider

### i18nReducer
