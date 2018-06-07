import {formatRoute} from "react-router-named-routes";
import renderTranslatedRoutes from "../renderTranslatedRoutes";

const localeFromLocation = (locales, defaultLocale) => location => {
  const match = /^\/([a-z]{2}).*/g.exec(location.pathname);
  if (match && locales.indexOf(match[1]) > -1) {
    return match[1];
  }

  return defaultLocale;
};

const localePrefix = defaultLocale => locale => locale === defaultLocale ? '' : `/${locale}`;

const formatIntlRoute = (routes, defaultLocale) => (routeName, params = {}, locale = null) => {
  locale = locale || defaultLocale;

  if (typeof routes[routeName] === 'string') {
    return `${localePrefix(defaultLocale)(locale)}${formatRoute(routes[routeName], params)}`;
  }

  return `${localePrefix(defaultLocale)(locale)}${formatRoute(routes[routeName][locale], params)}`;
};

const pathFromRoute = (paths, locale, defaultLocale) => {
  if (typeof paths === 'string') {
    return `${localePrefix(defaultLocale)(locale)}${paths}`;
  }

  return `${localePrefix(defaultLocale)(locale)}${paths[locale]}`;
};

export default ({routes, locales, defaultLocale}) => ({
  localeFromLocation: localeFromLocation(locales, defaultLocale),
  formatIntlRoute: formatIntlRoute(routes, defaultLocale),
  renderRoutes: renderTranslatedRoutes(locales, defaultLocale, routes, pathFromRoute)
});
