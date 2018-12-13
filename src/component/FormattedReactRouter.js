/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import withI18nRouting from './withI18nRouting';

export const FormattedLink = withI18nRouting(
  ({name, params, i18nRouting, ...rest}) => {
    return (
      <Link
        to={i18nRouting.formatIntlRoute(name, params, i18nRouting.locale)}
        {...rest}
      />
    );
  },
);

export const FormattedNavLink = withI18nRouting(
  ({name, params, i18nRouting, ...rest}) => (
    <NavLink
      to={i18nRouting.formatIntlRoute(name, params, i18nRouting.locale)}
      {...rest}
    />
  ),
);

export const FormattedRedirect = withI18nRouting(
  ({name, params, i18nRouting, ...rest}) => (
    <Redirect
      to={i18nRouting.formatIntlRoute(name, params, i18nRouting.locale)}
      {...rest}
    />
  ),
);
