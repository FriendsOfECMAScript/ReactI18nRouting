# Basic usage

Because this library has multiple points, this section provides a simple cookbook to get started with ReactI18nRouting
in your application. 

First of all, we have to define our routes with their translations:

```javascript
// src/routing/routes.js

export const HOME = 'home';
export const PAGE = 'page';
export const POST = 'post';

export default {
  [HOME]: '/',
  [POST]: {
    en: '/news/**',
    es: '/noticia/**',
    eu: '/albistea/**',
    fr: '/nouvelles/**',
  },
  [PAGE]: {
    en: '/page/**',
    es: '/pagina/**',
    eu: '/orrialdea/**',
    fr: '/page/**',
  },
};
```

It has been built on top of **react-router-config**, and each language strategy provides a helper to transform
the intl routing to valid react-router-config routing.

```javascript
// src/routing/config.js

import routes, {HOME, PAGE, POST} from './routes';
import Home from './ui/templates/Homepage';
import Page from './ui/templates/Page';
import Post from './ui/templates/Post';

export default [
  {
    paths: routes[HOME],
    component: Home,
    exact: true,
    routes: [
      {
        paths: routes[PAGE],
        component: Page,
      },
      {
        paths: routes[POST],
        component: Post,
      },
    ],
  },
];
```

The following file is the entry point of your React app.

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {I18nRoutingProvider, LocaleContext} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

import routes from './routing/config';

const history = createHistory();
const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

const languageStrategy = defaultUnprefixed({
  routes: routes,
  locales: ['eu', 'es', 'en', 'fr'],
  defaultLocale: 'es'
});

renderMethod(
  <I18nRoutingProvider
    defaultTranslatedRoutes={{es: '/es', en: '/'}}
    formatIntlRoute={languageStrategy.formatIntlRoute}
    history={history}
    localeFromPath={languageStrategy.localeFromLocation}
  >
    <LocaleContext>
      {({locale}) => languageStrategy.renderRoutes(locale)(routes)}
    </LocaleContext>
  </I18nRoutingProvider>,
  document.getElementById('root')
);
```

- In order to need more info about language strategies check [this guide](language_strategies.md).
- If you want to learn how to create React-Router link components with translation capabilities check [this guide](react_router_components.md).
- Back to the [index](index.md).
