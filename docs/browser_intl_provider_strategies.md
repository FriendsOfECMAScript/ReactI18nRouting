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

import i18n from './i18n';

const history = createHistory();

<ReduxBrowserIntlProvider
  formats={{formatIntlRoute: i18n.formatIntlRoute}}
  history={history}
  localeFromPath={i18n.localeFromLocation}
  messages={i18n.messages}
>
  {...}
</ReduxBrowserIntlProvider>
```
> *i18n* is a library's configuration, if you want to learn more about that, please check
[basic usage](basic_usage.md) chapter

This strategy apart of intl provider also exposes a fully functional reducer that fires when also exposed
`LANGUAGE_CHANGE` event is dispatched in the Redux actions.

```javascript
import {LANGUAGE_CHANGE} from '@foes/react-i18n-routing';

// ... other module of your application

import {i18nReducer} from '@foes/react-i18n-routing';
import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';

export default combineReducers({
  i18n: i18nReducer,
  routing: routerReducer,

// your other reducers  
});
```

## Local storage intl provider

TODO

## In memory intl provider

TODO

- Back to the [index](index.md).
