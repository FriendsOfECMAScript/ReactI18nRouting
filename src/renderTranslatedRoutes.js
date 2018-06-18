import flatMap from 'lodash.flatmap';

// eslint-disable-next-line max-params
const transformLocalizedPaths = (
  configRoute,
  pathFromRoute,
  defaultLocale,
  locales,
  currentLocale,
) => {
  const {paths, routes, ...rest} = configRoute;

  const getPrefixedPaths = paths => {
    let prefixedPaths = [];

    if (typeof paths === 'string') {
      prefixedPaths = locales
        .map(locale => pathFromRoute(paths, locale, defaultLocale, currentLocale))
        .filter(path => path !== null);
    } else {
      prefixedPaths = Object.keys(configRoute.paths).reduce(
        (previous, locale) => {
          const path = pathFromRoute(paths, locale, defaultLocale, currentLocale);

          if (path) {
            previous[locale] = path;
          }

          return previous;
        },
        {},
      );
    }

    return prefixedPaths;
  };

  const prefixedPaths = getPrefixedPaths(paths);

  return Object.keys(prefixedPaths).map(key => {
    const result = {
      path: prefixedPaths[key],
      ...rest,
    };

    if (routes) {
      result.routes = routes.map(route => {
        const {paths, ...rest} = route;

        return {
          path: getPrefixedPaths(paths)[key],
          ...rest,
        };
      });
    }

    return result;
  });
};

const renderTranslatedRoutes = (
  locales,
  defaultLocale,
  routes,
  pathFromRoute,
) => currentLocale => config =>
  flatMap(config.map(configRoute => {
    if (configRoute.paths) {
      configRoute = transformLocalizedPaths(
        configRoute,
        pathFromRoute,
        defaultLocale,
        locales,
        currentLocale,
      );
    }

    if (configRoute.routes) {
      configRoute.routes = renderTranslatedRoutes(
        locales,
        defaultLocale,
        routes,
        pathFromRoute,
      )(currentLocale)(configRoute.routes);
    }

    return configRoute;
  }));

export default renderTranslatedRoutes;
