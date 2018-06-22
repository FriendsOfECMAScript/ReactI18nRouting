# Basic usage

Because this library has multiple points, this section provides a simple cookbook to make work the ReactI18nRouting
in your application. In other chapters you can check more info about BrowserIntlProvider and language strategies, but
to keep this tutorial simple we are going to use **ReduxBrowserIntlProvider** and **defaultUnprefixed**.

```javascript
// src/i18n/languageStrategy.js

import {defaultUnPrefixed} from '@foes/react-i18n-routing';

import routes from './../routing/root/routes';

export const locales = ['eu', 'es', 'en', 'fr'];
const defaultLocale = 'eu';

const languageStrategy = defaultUnPrefixed({
  routes: routes,
  locales: locales,
  defaultLocale: defaultLocale,
});

export const localeFromLocation = languageStrategy.localeFromLocation;

export default languageStrategy;
```

```javascript
// src/i18n/index.js

import {getLocale} from '@foes/react-i18n-routing';
import {addLocaleData} from 'react-intl';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import eu from 'react-intl/locale-data/eu';
import fr from 'react-intl/locale-data/fr';

import languageStrategy, {locales, localeFromLocation} from './languageStrategy';

// There are simple json files with the language strings
import messagesEn from './messages/en.json';
import messagesEs from './messages/es.json';
import messagesEu from './messages/eu.json';
import messagesFr from './messages/fr.json';

addLocaleData([...en, ...es, ...eu, ...fr]);

export default {
  formatIntlRoute: (route, params, locale) =>
    languageStrategy.formatIntlRoute(route, params, locale ? locale : getLocale()),
  localeFromLocation: localeFromLocation,
  locales: locales,
  messages: {en: messagesEn, es: messagesEs, eu: messagesEu, fr: messagesFr},
  renderRoutes: config => languageStrategy.renderRoutes(getLocale())(config),
};
```

```javascript
// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ReduxBrowserIntlProvider} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

import i18n from './i18n/index.js';   // This is previously implemented file

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
      {...}
    </ReduxBrowserIntlProvider>
  </Provider>,
  document.getElementById('root'),
);
```
It has been built on top of **react-router-config**, and each language strategy provides a helper to transform
the intl routing to valid react-router-config routing. We strongly recommend that you separate in different modules
all the relative about routs translations and ReactRouterConfig's router tree, but to keep the example simple we have
decided to maintain all the code in the same place. 

```javascript
// src/routing/routes.js

import Home from './ui/templates/Homepage';
import Page from './ui/templates/Page';
import Post from './ui/templates/Post';

export const HOME = 'home';
export const PAGE = 'page';
export const POST = 'post';

const routes = {
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
- For more information about browser intl provider strategies check [this guide](browser_intl_provider_strategies.md).
- In order to need more info about language strategies check [this guide](language_strategies.md).
- Back to the [index](index.md).
