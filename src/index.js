/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {
  FormattedLink,
  FormattedNavLink,
  FormattedRedirect,
} from './component/FormattedReactRouter.js';
import defaultUnPrefixed from './languageStrategy/defaultUnprefixed.js';
import subdomainBased from './languageStrategy/subdomainBased.js';
import renderTranslatedRoutes from './renderTranslatedRoutes.js';

export {
  FormattedLink,
  FormattedNavLink,
  FormattedRedirect,
  defaultUnPrefixed,
  subdomainBased,
  renderTranslatedRoutes,
};
