import flatMap from 'lodash.flatmap';

const getRouteConfig = (
  configRoute,
  locale,
  pathFromRoute,
  defaultLocale,
  currentLocale,
) => {
  const {paths, ...configRouteRest} = configRoute;

  return {
    path: pathFromRoute(paths, locale, defaultLocale, currentLocale),
    ...configRouteRest,
  };
};

const renderTranslatedRoutesForLocales = (
  configRoute,
  routes,
  locales,
  pathFromRoute,
  defaultLocale,
  currentLocale,
) => flatMap(
  locales.map(locale => {
    const routeConfig = getRouteConfig(
      configRoute,
      locale,
      pathFromRoute,
      defaultLocale,
      currentLocale,
    );

    if (routeConfig.path === null) {
      return [];
    }

    return renderTranslatedRoutes(
      locales,
      defaultLocale,
      routes,
      pathFromRoute,
    )(currentLocale)([routeConfig], locale);
  }),
);

// eslint-disable-next-line max-params
const renderTranslatedRoutes = (
  locales,
  defaultLocale,
  routes,
  pathFromRoute,
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
            pathFromRoute,
            defaultLocale,
            currentLocale,
          );
        }

        if (iterationLocale) {
          configRoute = getRouteConfig(
            configRoute,
            iterationLocale,
            pathFromRoute,
            defaultLocale,
            currentLocale,
          );
        } else {
          return renderTranslatedRoutesForLocales(
            configRoute,
            routes,
            Object.keys(paths),
            pathFromRoute,
            defaultLocale,
            currentLocale,
          );
        }
      }

      if (configRoute.routes) {
        configRoute.routes = renderTranslatedRoutes(
          locales,
          defaultLocale,
          routes,
          pathFromRoute,
        )(currentLocale)(configRoute.routes, iterationLocale);
      }

      return configRoute;
    }),
  );

export default renderTranslatedRoutes;
