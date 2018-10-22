# BrowserIntlProvider strategies

*React-Intl* uses an IntlProvider component to manage the translations so, this library provides some wrappers over
this component to make this process more easy. At this moment we have these strategies implemented:

* [Redux](#redux-base-intl-provider)
* [Local storage](#local-storage-intl-provider)
* [In memory](#in-memory-intl-provider)

These strategies are implemented following the **render props** React's popular pattern. However this technique
generates useless boilerplate so, we have decorated providers itself with **High Order Component** pattern to reduce
unneeded code.

## Redux base intl provider

```javascript
import {ReduxBrowserIntlProvider} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

import i18n from './i18n/index.js';
import routes from './routing/routes.js';

const history = createHistory();

<ReduxBrowserIntlProvider
  formats={{formatIntlRoute: i18n.formatIntlRoute}}
  history={history}
  localeFromPath={i18n.localeFromLocation}
  messages={i18n.messages}
>
  {renderRoutes(i18n.renderRoutes(routes))}
</ReduxBrowserIntlProvider>
```
This strategy apart of intl provider also exposes a fully functional reducer that fires when also exposed
`LANGUAGE_CHANGE` event is dispatched in the Redux actions.

Check the [https://github.com/supasate/connected-react-router](connected-react-router) library to setup your connected router.

```javascript
import {LANGUAGE_CHANGE} from '@foes/react-i18n-routing';

// ... other module of your application

import {i18nReducer} from '@foes/react-i18n-routing';
import {combineReducers} from 'redux';

export default combineReducers({
  i18n: i18nReducer,

// your other reducers  
});
```

## Local storage intl provider

```javascript
import {LocalStorageBrowserIntlProvider} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

import i18n from './i18n/index.js';
import routes from './routing/routes.js';

const history = createHistory();

<LocalStorageBrowserIntlProvider
  formats={{formatIntlRoute: i18n.formatIntlRoute}}
  history={history}
  localeFromPath={i18n.localeFromLocation}
  messages={i18n.messages}
>
  {renderRoutes(i18n.renderRoutes(routes))}
</LocalStorageBrowserIntlProvider>
```

## In memory intl provider

```javascript
import {InMemoryBrowserIntlProvider} from '@foes/react-i18n-routing';
import createHistory from 'history/createBrowserHistory';

import i18n from './i18n/index.js';
import routes from './routing/routes.js';

const history = createHistory();

<InMemoryBrowserIntlProvider
  formats={{formatIntlRoute: i18n.formatIntlRoute}}
  history={history}
  locale="eu"
  localeFromPath={i18n.localeFromLocation}
  messages={i18n.messages}
>
  {renderRoutes(i18n.renderRoutes(routes))}
</InMemoryBrowserIntlProvider>
```

> *i18n* is a library's configuration and *routes* is an array that contains all the tree, if you want to learn more
about that, please check [basic usage](basic_usage.md) chapter

- Back to the [index](index.md).
