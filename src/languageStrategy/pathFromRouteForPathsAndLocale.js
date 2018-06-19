const pathFromRouteForPathsAndLocale = (defaultLocale, pathFromRoute) =>
  (paths, locale, currentLocale) => pathFromRoute(paths, locale, defaultLocale, currentLocale);

export default pathFromRouteForPathsAndLocale;
