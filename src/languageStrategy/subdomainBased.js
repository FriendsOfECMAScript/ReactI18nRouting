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

const subdomainFromHostname = hostname => hostname.split(".")[0];

const hostnameForLocale = (locale, subdomains, domain) =>
  `//${subdomains[locale]}.${domain}`;

const localeFromLocation = (subdomains, defaultLocale) => location => {
  let currentLocale = defaultLocale;
  Object.keys(subdomains).forEach(locale => {
    if (subdomains[locale] === subdomainFromHostname(location.hostname)) {
      currentLocale = locale;
    }
  });

  return currentLocale;
};

const formatIntlRoute = (routes, subdomain, domain) => (
  routeName,
  params = {},
  locale = getLocale()
) => {
  const prefix = params.absolute
    ? hostnameForLocale(locale, subdomain, domain)
    : "";

  if (typeof routes[routeName] === "string") {
    return `${prefix}${formatRoute(routes[routeName], params)}`;
  }

  return `${prefix}${formatRoute(routes[routeName][locale], params)}`;
};

const pathFromRoute = (paths, locale, defaultLocale, currentLocale) => {
  if (locale !== currentLocale) {
    return null;
  }

  if (typeof paths === "string") {
    return paths;
  }

  return paths[currentLocale];
};

export default ({ routes, locales, defaultLocale, subdomains, domain }) => ({
  localeFromLocation: localeFromLocation(subdomains, defaultLocale),
  formatIntlRoute: formatIntlRoute(routes, subdomains, domain),
  renderRoutes: renderTranslatedRoutes(
    locales,
    routes,
    pathFromRouteForPathsAndLocale(defaultLocale, pathFromRoute)
  )
});
