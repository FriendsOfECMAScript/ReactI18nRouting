import pathFromRouteForPathsAndLocale from './../../src/languageStrategy/pathFromRouteForPathsAndLocale.js';

test('It returns a function instance', () => {
  expect(
    pathFromRouteForPathsAndLocale('en', () => '/some-route'),
  ).toBeInstanceOf(Function);
});
