export default (defaultLocale, pathFromRoute) => (
  paths,
  locale,
  currentLocale,
) => pathFromRoute(paths, locale, defaultLocale, currentLocale);
