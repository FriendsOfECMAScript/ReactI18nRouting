/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { formatRoute } from "react-router-named-routes";

import { getLocale } from "./../locale.js";
import renderTranslatedRoutes from "./../renderTranslatedRoutes.js";
import pathFromRouteForPathsAndLocale from "./pathFromRouteForPathsAndLocale.js";

const localeFromLocation = (locales, defaultLocale) => location => {
  const match = /^\/([a-z]{2})(\/|$).*/g.exec(location.pathname);
  if (match && locales.indexOf(match[1]) > -1) {
    return match[1];
  }

  return defaultLocale;
};

const localePrefix = defaultLocale => locale =>
  locale === defaultLocale ? "" : `/${locale}`;

const formatIntlRoute = (routes, defaultLocale) => (
  routeName,
  params = {},
  locale = getLocale()
) => {
  locale = locale || defaultLocale;

  if (typeof routes[routeName] === "string") {
    return `${localePrefix(defaultLocale)(locale)}${formatRoute(
      routes[routeName],
      params
    )}`;
  }

  return `${localePrefix(defaultLocale)(locale)}${formatRoute(
    routes[routeName][locale],
    params
  )}`;
};

const pathFromRoute = (paths, locale, defaultLocale) => {
  if (typeof paths === "string") {
    return `${localePrefix(defaultLocale)(locale)}${paths}`;
  }

  const translatedPath = paths[locale];

  if (Array.isArray(translatedPath)) {
    return translatedPath.map(
      path => `${localePrefix(defaultLocale)(locale)}${path}`
    );
  }

  return `${localePrefix(defaultLocale)(locale)}${paths[locale]}`;
};

export default ({ routes, locales, defaultLocale }) => ({
  localeFromLocation: localeFromLocation(locales, defaultLocale),
  formatIntlRoute: formatIntlRoute(routes, defaultLocale),
  renderRoutes: renderTranslatedRoutes(
    locales,
    routes,
    pathFromRouteForPathsAndLocale(defaultLocale, pathFromRoute)
  )
});
