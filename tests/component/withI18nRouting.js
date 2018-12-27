import React from 'react';
import {render} from 'react-testing-library';
import createHistory from 'history/createMemoryHistory';

import I18nRoutingProvider from '../../src/component/I18nRoutingProvider';
import defaultUnprefixed from '../../src/languageStrategy/defaultUnprefixed';
import withI18nRouting from '../../src/component/withI18nRouting';

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

test('It sets translated slugs for context', () => {
  const Component = ({i18nRouting}) => {
    i18nRouting.setTranslatedRoutes({es: '/es/ejemplo', en: '/example'});

    return Object.keys(i18nRouting.translatedRoutes).map(key => (
      <span data-testid={`link-${key}`} key={key}>
        {i18nRouting.translatedRoutes[key]}
      </span>
    ));
  };

  const ComponentWithI18nRouting = withI18nRouting(Component);

  const {getByTestId} = render(
    <Base history={createHistory({initialEntries: ['/en']})}>
      <ComponentWithI18nRouting />
    </Base>,
  );

  expect(getByTestId('link-es').textContent).toBe('/es/ejemplo');
  expect(getByTestId('link-en').textContent).toBe('/example');
});
