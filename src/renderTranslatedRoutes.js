import flatMap from 'lodash.flatmap';
import pathFromRouteForPathsAndLocale from './languageStrategy/pathFromRouteForPathsAndLocale';

// eslint-disable-next-line max-params
const getRouteConfig = (
  configRoute,
  locale,
  currentLocale,
  pathFromRouteForPathsAndLocale,
) => {
  const {paths, ...configRouteRest} = configRoute;

  return {
    path: pathFromRouteForPathsAndLocale(paths, locale, currentLocale),
    ...configRouteRest,
  };
};

// eslint-disable-next-line max-params
const renderTranslatedRoutesForLocales = (
  configRoute,
  routes,
  locales,
  currentLocale,
  pathFromRouteForPathsAndLocale,
) => flatMap(
  locales.map(locale => {
    const routeConfig = getRouteConfig(
      configRoute,
      locale,
      currentLocale,
      pathFromRouteForPathsAndLocale,
    );

    if (routeConfig.path === null) {
      return [];
    }

    return renderTranslatedRoutes(
      locales,
      routes,
      pathFromRouteForPathsAndLocale,
    )(currentLocale)([routeConfig], locale);
  }),
);

// eslint-disable-next-line max-params
const renderTranslatedRoutes = (
  locales,
  routes,
  pathFromRouteForPathsAndLocale,
) => currentLocale => (config, iterationLocale) =>
  flatMap(
    config.map(configRoute => {
      const {paths} = configRoute;

      if (paths) {
        if (typeof paths === 'string') {
          return renderTranslatedRoutesForLocales(
            configRoute,
            routes,
            locales,
            currentLocale,
            pathFromRouteForPathsAndLocale,
          );
        }

        if (iterationLocale) {
          configRoute = getRouteConfig(
            configRoute,
            iterationLocale,
            currentLocale,
            pathFromRouteForPathsAndLocale,
          );
        } else {
          return renderTranslatedRoutesForLocales(
            configRoute,
            routes,
            Object.keys(paths),
            currentLocale,
            pathFromRouteForPathsAndLocale,
          );
        }
      }

      if (configRoute.routes) {
        configRoute.routes = renderTranslatedRoutes(
          locales,
          routes,
          pathFromRouteForPathsAndLocale,
        )(currentLocale)(configRoute.routes, iterationLocale);
      }

      return configRoute;
    }),
  );

export default renderTranslatedRoutes;
