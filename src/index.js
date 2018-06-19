import BrowserIntlProvider from './component/BrowserIntlProvider.js';
import FormattedLink from './component/FormattedLink.js';
import FormattedNavLink from './component/FormattedNavLink.js';
import defaultUnPrefixed from './languageStrategy/defaultUnprefixed.js';
import subdomainBased from './languageStrategy/subdomainBased.js';
import * as Reducer from './reducer.js';
import * as RenderTranslatedRoutes from './renderTranslatedRoutes.js';

export {
  BrowserIntlProvider,
  FormattedLink,
  FormattedNavLink,
  defaultUnPrefixed,
  subdomainBased,
  Reducer,
  RenderTranslatedRoutes,
};
