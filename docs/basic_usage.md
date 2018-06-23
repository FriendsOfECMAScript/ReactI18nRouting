# Basic usage

Because this library has multiple points, this section provides a simple cookbook to make work the ReactI18nRouting
in your application. In other chapters you can check more info about BrowserIntlProvider and language strategies, but
to keep this tutorial simple we are going to use **ReduxBrowserIntlProvider** and **defaultUnprefixed**.

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
    fr: '/news/**',
  },
  [PAGE]: {
    en: '/page/**',
    es: '/pagina/**',
    eu: '/orrialdea/**',
    fr: '/page/**',
  },
};
```

Then, we need to configure our language strategy. The following code represents the minimum required code to
make work the *defaultUnPrefixed* strategy.

```javascript
// src/i18n/languageStrategy.js

import {defaultUnPrefixed} from '@foes/react-i18n-routing';

import routes from './../routing/routes';

export const locales = ['eu', 'es', 'en', 'fr'];
const defaultLocale = 'eu';

const languageStrategy = defaultUnPrefixed({routes, locales, defaultLocale});

export const formatIntlRoute = languageStrategy.formatIntlRoute;
export const localeFromLocation = languageStrategy.localeFromLocation;
export const renderRoutes = languageStrategy.renderRoutes;
```
After that, we are ready to configure our application's i18n preferences. In this case we are also
configuring the *react-intl* locales. This file exposes some useful methods to use in your application bootstrapping.  

```javascript
// src/i18n/index.js

import {getLocale} from '@foes/react-i18n-routing';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import eu from 'react-intl/locale-data/eu';
import fr from 'react-intl/locale-data/fr';

import {locales, formatIntlRoute, localeFromLocation, renderRoutes} from './languageStrategy';

// There are simple json files with the language strings
import messagesEn from './messages/en.json';
import messagesEs from './messages/es.json';
import messagesEu from './messages/eu.json';
import messagesFr from './messages/fr.json';

addLocaleData([...en, ...es, ...eu, ...fr]);

export default {
  formatIntlRoute: (route, params, locale) => formatIntlRoute(route, params, locale || getLocale()),
  localeFromLocation: localeFromLocation,
  locales: locales,
  messages: {en: messagesEn, es: messagesEs, eu: messagesEu, fr: messagesFr},
  renderRoutes: config => renderRoutes(getLocale())(config),
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
import {Provider} from 'react-redux';
import {renderRoutes} from 'react-router-config';
import {ReduxBrowserIntlProvider} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

// There are previously implemented files
import i18n from './i18n/index.js';
import routes from './routing/routes.js';

const history = createHistory();

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate;

renderMethod(
  <Provider store={store}>
    <ReduxBrowserIntlProvider
      formats={{formatIntlRoute: i18n.formatIntlRoute}}
      history={history}
      localeFromPath={i18n.localeFromLocation}
      messages={i18n.messages}
    >
      {renderRoutes(i18n.renderRoutes(routes))}
    </ReduxBrowserIntlProvider>
  </Provider>,
  document.getElementById('root'),
);
```

- For more information about browser intl provider strategies check [this guide](browser_intl_provider_strategies.md).
- In order to need more info about language strategies check [this guide](language_strategies.md).
- Back to the [index](index.md).
