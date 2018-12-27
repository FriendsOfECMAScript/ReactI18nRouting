import React from "react";
import { render } from "react-testing-library";
import createHistory from "history/createMemoryHistory";

import I18nRoutingProvider from "../../src/component/I18nRoutingProvider";
import withI18nRouting from "../../src/component/withI18nRouting";
import defaultUnprefixed from "../../src/languageStrategy/defaultUnprefixed";

const languageStrategy = defaultUnprefixed({
  routes: [],
  locales: ["en", "es", "fr"],
  defaultLocale: "en"
});

const Base = ({ children, history }) => (
  <I18nRoutingProvider
    defaultTranslatedRoutes={{ es: "/es", en: "/" }}
    formatIntlRoute={languageStrategy.formatIntlRoute}
    history={history}
    localeFromPath={languageStrategy.localeFromLocation}
  >
    {children}
  </I18nRoutingProvider>
);

test("It exposes locale as render prop", () => {
  const Component = withI18nRouting(({ i18nRouting }) => (
    <span data-testid="locale">{i18nRouting.locale}</span>
  ));
  const { getByTestId } = render(
    <Base history={createHistory({ initialEntries: ["/en"] })}>
      <Component />
    </Base>
  );

  expect(getByTestId("locale").textContent).toBe("en");
});

test("It updates locale on history change", () => {
  const history = createHistory({
    initialEntries: ["/en"]
  });

  const Component = withI18nRouting(({ i18nRouting }) => (
    <span data-testid="locale">{i18nRouting.locale}</span>
  ));

  const { getByTestId, rerender } = render(
    <Base
      formatIntlRoute={languageStrategy.formatIntlRoute}
      history={history}
      localeFromPath={languageStrategy.localeFromLocation}
    >
      <Component />
    </Base>
  );

  expect(getByTestId("locale").textContent).toBe("en");

  history.push("/es");

  rerender(
    <I18nRoutingProvider
      formatIntlRoute={languageStrategy.formatIntlRoute}
      history={history}
      localeFromPath={languageStrategy.localeFromLocation}
    >
      <Component />
    </I18nRoutingProvider>
  );

  expect(getByTestId("locale").textContent).toBe("es");
});

test("It sets translated routes", () => {
  const Component = ({ i18nRouting }) => {
    i18nRouting.setTranslatedRoutes({ es: "/es/ejemplo", en: "/example" });

    return Object.keys(i18nRouting.translatedRoutes).map(key => (
      <span data-testid={`link-${key}`} key={key}>
        {i18nRouting.translatedRoutes[key]}
      </span>
    ));
  };

  const ComponentWithI18nRouting = withI18nRouting(Component);

  const { getByTestId } = render(
    <Base history={createHistory({ initialEntries: ["/en"] })}>
      <ComponentWithI18nRouting />
    </Base>
  );

  expect(getByTestId("link-es").textContent).toBe("/es/ejemplo");
  expect(getByTestId("link-en").textContent).toBe("/example");
});
