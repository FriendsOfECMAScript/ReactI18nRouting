# Language strategies

Your application routes system must follow a concrete strategy. At this moment, this library supports the following:

* [Default unprefixed](#default-unprefixed)
* [Subdomain based](#subdomain-based)

All language strategies exposes the same API:

* `localeFromLocation(location)`: Resolves current locale based on [location object][1].
* `formatIntlRoute(routeName, {locale, ...params)`: Generates route based on route name and locale (if none given,
default will be used). Rest of parameters are passed as arguments to `formatRoute`.
* `renderRoutes(config)`: Like ReactRouterConfig's renderRoutes, renders the tree of router from given node, but
supporting the translations.

## Default unprefixed
Prefixes all paths with locales but the locale set as default.

```javascript
import {defaultUnprefixed} from '@foes/react-i18n-routing';
import routes from './routing/config';

const locales = ['eu', 'es', 'en', 'fr'];
const defaultLocale = 'eu';

const languageStrategy = defaultUnprefixed({routes, locales, defaultLocale});
```

## Subdomain based
Based on domain resolves current locale.

```javascript
import {subdomainBased} from '@foes/react-i18n-routing';
import routes from './routing/config';

const locales = ['eu', 'es', 'en', 'fr'];
const defaultLocale = 'eu';

const languageStrategy = subdomainBased({
  routes: routes,
  locales: locales,
  defaultLocale: defaultLocale,
  domain: 'yourawesomecommerce.com',
  subdomains: {
    eu: 'denda',
    es: 'tienda',
    en: 'shop',
    fr: 'boutique',
  }
});
```

- [Back to the first chapter](basic_usage.md) if you want to configure this library in your React app.
- If you want to learn how to create React-Router link components with translation capabilities check [this guide](react_router_components.md).
- Back to the [index](index.md).

[1]: https://developer.mozilla.org/en-US/docs/Web/API/Location 
