/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {render} from 'react-testing-library';
import createHistory from 'history/createMemoryHistory';

import I18nRoutingProvider from './../../src/component/I18nRoutingProvider';
import defaultUnprefixed from './../../src/languageStrategy/defaultUnprefixed';
import LocaleContext from './../../src/component/LocaleContext';

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
  <I18nRoutingProvider
    defaultTranslatedRoutes={{es: '/es', en: '/'}}
    formatIntlRoute={languageStrategy.formatIntlRoute}
    history={history}
    localeFromPath={languageStrategy.localeFromLocation}
  >
    {children}
  </I18nRoutingProvider>
);

test('It passes context to the component through LocaleContext', () => {
  const Component = ({i18nRouting}) => {
    i18nRouting.setTranslatedRoutes({es: '/es/ejemplo', en: '/example'});

    return Object.keys(i18nRouting.translatedRoutes).map(key => (
      <span data-testid={`link-${key}`} key={key}>
        {i18nRouting.translatedRoutes[key]}
      </span>
    ));
  };

  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/en']})}>
      <LocaleContext>{i18nRouting => <Component i18nRouting={i18nRouting} />}</LocaleContext>
    </Base>,
  );

  expect(getByTestId('link-es').textContent).toBe('/es/ejemplo');
  expect(getByTestId('link-en').textContent).toBe('/example');
});

test('It passes current locale to the component through LocaleContext', () => {
  const Component = ({locale}) => <span data-testid="link">{locale}</span>;

  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/en']})}>
      <LocaleContext>{({locale}) => <Component locale={locale} />}</LocaleContext>
    </Base>,
  );

  expect(getByTestId('link').textContent).toBe('en');
});
