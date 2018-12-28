# React Router components

React Router provides some React components to make simple navigation actions more easy. These components are
*Link*, *NavLink* and *Redirect* so, on top of them the library builds the same components with
translation behaviour. They admit the same props that they admit the original React Router components plus locale if
you need to force explicitly the locale, otherwise the current locale provided by React Intl will
be used. 

The following code is a simple usage example of these components.

```javascript
import {FormattedLink, FormattedNavLink, FormattedRedirect} from '@foes/react-i18n-routing';

<FormattedLink name="route_name" params={{param1: 'value'}}/>

<FormattedNavLink name="route_name" params={{param1: 'value'}}/>

<FormattedRedirect name="route_name" params={{param1: 'value'}}/>
```

- [Back to the first chapter](basic_usage.md) if you want to configure this library in your React app.
- In order to need more info about language strategies check [this guide](language_strategies.md).
- Back to the [index](index.md).
