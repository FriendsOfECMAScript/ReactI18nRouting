/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import BrowserIntlProvider from './component/BrowserIntlProvider.js';
import InMemoryBrowserIntlProvider from './component/bridges/InMemoryBrowserIntlProvider.js';
import LocalStorageBrowserIntlProvider from './component/bridges/LocalStorageBrowserIntlProvider.js';
import ReduxBrowserIntlProvider, {
  ConnectedReduxBrowserIntlProvider,
  i18nReducer,
  LANGUAGE_CHANGE,
} from './component/bridges/ReduxBrowserIntlProvider.js';
import {
  FormattedLink,
  FormattedNavLink,
  FormattedRedirect,
} from './component/FormattedReactRouter.js';
import defaultUnPrefixed from './languageStrategy/defaultUnprefixed.js';
import subdomainBased from './languageStrategy/subdomainBased.js';
import renderTranslatedRoutes from './renderTranslatedRoutes.js';
import {getLocale} from './locale.js';

export {
  BrowserIntlProvider,
  InMemoryBrowserIntlProvider,
  LocalStorageBrowserIntlProvider,
  ReduxBrowserIntlProvider,
  ConnectedReduxBrowserIntlProvider,
  i18nReducer,
  LANGUAGE_CHANGE,
  FormattedLink,
  FormattedNavLink,
  FormattedRedirect,
  defaultUnPrefixed,
  subdomainBased,
  renderTranslatedRoutes,
  getLocale,
};
