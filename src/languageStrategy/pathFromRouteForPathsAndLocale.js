/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export default (defaultLocale, pathFromRoute) => (
  paths,
  locale,
  currentLocale,
) => pathFromRoute(paths, locale, defaultLocale, currentLocale);
