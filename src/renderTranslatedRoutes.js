import flatMap from 'lodash.flatmap';

// eslint-disable-next-line max-params
const transformLocalizedPaths = (configRoute, routes, pathFromRoute, defaultLocale, locales, currentLocale) => {
  const {paths, routes: routeRoutes, ...rest} = configRoute;

  let prefixedPaths = [];

  if (typeof paths === 'string') {
    prefixedPaths = locales
      .map(locale => pathFromRoute(paths, locale, defaultLocale, currentLocale))
      .filter(path => path !== null);
  } else {
    prefixedPaths = Object.keys(configRoute.paths).reduce((previous, locale) => {
      const path = pathFromRoute(paths, locale, defaultLocale, currentLocale);

      if (path) {
        previous[locale] = path;
      }

      return previous;
    }, {});
  }

  return Object.keys(prefixedPaths)
    .map(key => {
      const result = {
        path: prefixedPaths[key],
        ...rest
      };

      if (routeRoutes) {
        result.routes = renderTranslatedRoutes(locales, defaultLocale, routes, pathFromRoute)(routeRoutes);
      }

      return result;
    });
};

const renderTranslatedRoutes = (locales, defaultLocale, routes, pathFromRoute) => currentLocale => config => (
  flatMap(config.map(configRoute => {
    if (configRoute.paths) {
      return transformLocalizedPaths(configRoute, routes, pathFromRoute, defaultLocale, locales, currentLocale);
    }

    if (configRoute.routes) {
      return {
        ...configRoute,
        routes: renderTranslatedRoutes(locales, defaultLocale, routes, pathFromRoute)(currentLocale)(configRoute.routes)
      };
    }

    return {...configRoute};
  }))
);

export default renderTranslatedRoutes;
