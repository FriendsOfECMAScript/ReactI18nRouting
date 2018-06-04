# i18n helpers

Provides components and functions to make i18n apps with ease.

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
