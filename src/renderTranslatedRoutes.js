import flatMap from 'lodash.flatmap';

// eslint-disable-next-line max-params
const renderTranslatedRoutes = (
  locales,
  defaultLocale,
  routes,
  pathFromRoute,
) => currentLocale => (config, iterationLocale) =>
  flatMap(
    config.map(configRoute => {
      const {paths, ...configRouteRest} = configRoute;

      if (paths) {
        const
          getRouteConfig = localeKey => ({
            path: pathFromRoute(paths, localeKey, defaultLocale, currentLocale),
            ...configRouteRest,
          }),
          renderTranslatedRoutesForLocales = pathLocales =>
            flatMap(
              pathLocales.map(key => {
                const routeConfig = getRouteConfig(key);

                if (routeConfig.path === null) {
                  return [];
                }

                return renderTranslatedRoutes(
                  locales,
                  defaultLocale,
                  routes,
                  pathFromRoute,
                )(currentLocale)([routeConfig], key);
              }),
            );

        if (typeof paths === 'string') {
          return renderTranslatedRoutesForLocales(locales);
        }

        if (iterationLocale) {
          configRoute = getRouteConfig(iterationLocale);
        } else {
          return renderTranslatedRoutesForLocales(Object.keys(paths));
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
