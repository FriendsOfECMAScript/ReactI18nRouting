/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';

import I18nRoutingContext from './I18nRoutingContext';

export const withI18nRouting = Component => props => (
  <I18nRoutingContext.Consumer>{context => <Component i18nRouting={context} {...props} />}</I18nRoutingContext.Consumer>
);

export default withI18nRouting;
