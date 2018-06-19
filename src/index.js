import BrowserIntlProvider from './component/BrowserIntlProvider.js';
import InMemoryBrowserIntlProvider from './component/bridges/InMemoryBrowserIntlProvider.js';
import LocalStorageBrowserIntlProvider from './component/bridges/LocalStorageBrowserIntlProvider.js';
import ReduxBrowserIntlProvider, {
  i18nReducer,
  LANGUAGE_CHANGE,
} from './component/bridges/ReduxBrowserIntlProvider.js';
import FormattedLink from './component/FormattedLink.js';
import FormattedNavLink from './component/FormattedNavLink.js';
import FormattedRedirect from './component/FormattedRedirect.js';
import defaultUnPrefixed from './languageStrategy/defaultUnprefixed.js';
import subdomainBased from './languageStrategy/subdomainBased.js';
import renderTranslatedRoutes from './renderTranslatedRoutes.js';
import {getLocale} from './locale.js';

export {
  BrowserIntlProvider,
  InMemoryBrowserIntlProvider,
  LocalStorageBrowserIntlProvider,
  ReduxBrowserIntlProvider,
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
