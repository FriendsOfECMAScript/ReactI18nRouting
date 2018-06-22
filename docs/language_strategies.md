# Language strategies

(This section is not completed)

All language strategies use the following API:

**`localeFromLocation(location)`**

Resolves current locale based on [location object](https://developer.mozilla.org/en-US/docs/Web/API/Location)

**`formatIntlRoute(routeName, {locale, ...params)`**

Generates route based on route name and locale (if none given, default will be used). Rest of parameters are passed as
arguments to `formatRoute`

Some **language strategies** are already **available**

## Default unprefixed

Prefixes all paths with locales but the locale set as default

## Domain based

Based on domain resolves current locale

- Back to the [index](index.md).
