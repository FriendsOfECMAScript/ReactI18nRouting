/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import flatMap from 'lodash.flatmap';

// eslint-disable-next-line max-params
const getRouteConfig = (configRoute, locale, currentLocale, pathFromRouteForPathsAndLocale) => {
    const {paths, ...configRouteRest} = configRoute;

    return {
      path: pathFromRouteForPathsAndLocale(paths, locale, currentLocale),
      ...configRouteRest,
    };
  },
  getRouteConfigForLocale = (configRoute, currentLocale, pathFromRouteForPathsAndLocale) => locale =>
    getRouteConfig(configRoute, locale, currentLocale, pathFromRouteForPathsAndLocale);

// eslint-disable-next-line max-params
const renderTranslatedRoutesForLocales = (
    configRoute,
    routes,
    locales,
    currentLocale,
    pathFromRouteForPathsAndLocale,
    getRouteConfigForCurrentLocale,
  ) =>
    flatMap(
      locales.map(locale => {
        const routeConfig = getRouteConfigForCurrentLocale(locale);

        if (routeConfig.path === null) {
          return [];
        }

        // eslint-disable-next-line no-use-before-define
        return renderTranslatedRoutes(locales, routes, pathFromRouteForPathsAndLocale)(currentLocale)(
          [routeConfig],
          locale,
        );
      }),
    ),
  // eslint-disable-next-line max-params
  renderTranslatedRoutesForConfig = (
    configRoute,
    routes,
    currentLocale,
    pathFromRouteForPathsAndLocale,
    getRouteConfigForCurrentLocale,
  ) => locales =>
    renderTranslatedRoutesForLocales(
      configRoute,
      routes,
      locales,
      currentLocale,
      pathFromRouteForPathsAndLocale,
      getRouteConfigForCurrentLocale,
    );

// eslint-disable-next-line max-params
const renderTranslatedRoutes = (locales, routes, pathFromRouteForPathsAndLocale) => currentLocale => (
  config,
  iterationLocale,
) =>
  flatMap(
    config.map(configRoute => {
      const getRouteConfigForCurrentLocale = getRouteConfigForLocale(
          configRoute,
          currentLocale,
          pathFromRouteForPathsAndLocale,
        ),
        renderTranslatedRoutesForCurrentConfig = renderTranslatedRoutesForConfig(
          configRoute,
          routes,
          currentLocale,
          pathFromRouteForPathsAndLocale,
          getRouteConfigForCurrentLocale,
        );

      const {paths} = configRoute;

      if (paths) {
        if (typeof paths === 'string') {
          return renderTranslatedRoutesForCurrentConfig(locales);
        }

        if (iterationLocale) {
          configRoute = getRouteConfigForCurrentLocale(iterationLocale);
        } else {
          return renderTranslatedRoutesForCurrentConfig(Object.keys(paths));
        }
      }

      if (configRoute.routes) {
        configRoute.routes = renderTranslatedRoutes(locales, routes, pathFromRouteForPathsAndLocale)(currentLocale)(
          configRoute.routes,
          iterationLocale,
        );
      }

      return configRoute;
    }),
  );

export default renderTranslatedRoutes;
