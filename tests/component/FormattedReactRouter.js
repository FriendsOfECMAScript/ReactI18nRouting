import React from 'react';
import {render} from 'react-testing-library';
import createHistory from 'history/createMemoryHistory';
import {Router} from 'react-router-dom';

import I18nRoutingProvider from '../../src/component/I18nRoutingProvider';
import defaultUnprefixed from '../../src/languageStrategy/defaultUnprefixed';
import {
  FormattedLink,
  FormattedNavLink,
} from '../../src/component/FormattedReactRouter';

const languageStrategy = defaultUnprefixed({
  routes: {
    example: {
      en: '/example',
      es: '/ejemplo',
      fr: '/exemple',
    },
  },
  locales: ['en', 'es', 'fr'],
  defaultLocale: 'en',
});

const Base = ({children, history}) => (
  <Router history={history}>
    <I18nRoutingProvider
      formatIntlRoute={languageStrategy.formatIntlRoute}
      history={history}
      localeFromPath={languageStrategy.localeFromLocation}
    >
      {children}
    </I18nRoutingProvider>
  </Router>
);

test('It formats link according current locale (en)', () => {
  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/en']})}>
      <FormattedLink data-testid="link" name="example" />
    </Base>,
  );

  expect(getByTestId('link').getAttribute('href')).toBe('/example');
});

test('It formats link according current locale (es)', () => {
  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/es']})}>
      <FormattedLink data-testid="link" name="example" />
    </Base>,
  );

  expect(getByTestId('link').getAttribute('href')).toBe('/es/ejemplo');
});

test('It formats nav link according current locale (en)', () => {
  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/en']})}>
      <FormattedNavLink data-testid="link" name="example" />
    </Base>,
  );

  expect(getByTestId('link').getAttribute('href')).toBe('/example');
});

test('It formats nav link according current locale (es)', () => {
  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/es']})}>
      <FormattedNavLink data-testid="link" name="example" />
    </Base>,
  );

  expect(getByTestId('link').getAttribute('href')).toBe('/es/ejemplo');
});
