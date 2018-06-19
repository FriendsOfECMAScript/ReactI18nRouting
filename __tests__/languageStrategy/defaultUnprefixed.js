import React from 'react';
import defaultUnprefixed from './../../src/languageStrategy/defaultUnprefixed';

const DummyComponent = () => <div />;

const languageStrategy = defaultUnprefixed({
  locales: ['en', 'es', 'eu'],
  defaultLocale: 'en',
});

test('It detects locale based in location', () => {
  expect(languageStrategy.localeFromLocation({pathname: '/some-route'})).toBe(
    'en',
  );
  expect(
    languageStrategy.localeFromLocation({pathname: '/es/some-route'}),
  ).toBe('es');
  expect(
    languageStrategy.localeFromLocation({pathname: '/eu/some-route'}),
  ).toBe('eu');
});

test('Generates valid react-router-config tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        paths: {
          en: '/product/:slug',
          es: '/producto/:slug',
          eu: '/produktua/:slug',
        },
        component: DummyComponent,
      },
      {
        paths: {
          en: '/cart',
          es: '/carrito',
          eu: '/saskia',
        },
        component: DummyComponent,
      },
      {
        path: '/',
        component: DummyComponent,
        exact: true,
      },
    ]),
  ).toEqual([
    {
      path: '/product/:slug',
      component: DummyComponent,
    },
    {
      path: '/es/producto/:slug',
      component: DummyComponent,
    },
    {
      path: '/eu/produktua/:slug',
      component: DummyComponent,
    },
    {
      path: '/cart',
      component: DummyComponent,
    },
    {
      path: '/es/carrito',
      component: DummyComponent,
    },
    {
      path: '/eu/saskia',
      component: DummyComponent,
    },
    {
      path: '/',
      component: DummyComponent,
      exact: true,
    },
  ]);
});

test('Generates valid react-router-config nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        component: DummyComponent,
        routes: [
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
            component: DummyComponent,
          },
          {
            paths: {
              en: '/cart',
              es: '/carrito',
              eu: '/saskia',
            },
            component: DummyComponent,
          },
          {
            path: '/',
            component: DummyComponent,
            exact: true,
          },
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      component: DummyComponent,
      routes: [
        {
          path: '/product/:slug',
          component: DummyComponent,
        },
        {
          path: '/es/producto/:slug',
          component: DummyComponent,
        },
        {
          path: '/eu/produktua/:slug',
          component: DummyComponent,
        },
        {
          path: '/cart',
          component: DummyComponent,
        },
        {
          path: '/es/carrito',
          component: DummyComponent,
        },
        {
          path: '/eu/saskia',
          component: DummyComponent,
        },
        {
          path: '/',
          component: DummyComponent,
          exact: true,
        },
      ],
    },
  ]);
});

test('Generates valid react-router-config deeply nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        component: DummyComponent,
        exact: false,
        routes: [
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
            component: DummyComponent,
            exact: false,
            routes: [{
              paths: {
                en: '/product/:slug/edit',
                es: '/producto/:slug/editar',
                eu: '/produktua/:slug/aldatu',
              },
              component: DummyComponent,
              exact: true,
            }, {
              paths: {
                en: '/product/:slug/view',
                es: '/producto/:slug/ver',
                eu: '/produktua/:slug/ikusi',
              },
              component: DummyComponent,
              exact: true,
            }, {
              paths: {
                en: '/product/:slug/comments/:comment',
                es: '/producto/:slug/comentarios/:comment',
                eu: '/produktua/:slug/iruzkinak/:comment',
              },
              component: DummyComponent,
              exact: false,
              routes: [{
                paths: {
                  en: '/product/:slug/comments/:comment/edit',
                  es: '/producto/:slug/comentarios/:comment/editar',
                  eu: '/produktua/:slug/iruzkinak/:comment/aldatu',
                },
                component: DummyComponent,
                exact: true,
              }],
            }],
          },
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      component: DummyComponent,
      exact: false,
      routes: [
        {
          path: '/product/:slug',
          component: DummyComponent,
          exact: false,
          routes: [{
            path: '/product/:slug/edit',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/product/:slug/view',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/product/:slug/comments/:comment',
            component: DummyComponent,
            exact: false,
            routes: [{
              path: '/product/:slug/comments/:comment/edit',
              component: DummyComponent,
              exact: true,
            }],
          }],
        },
        {
          path: '/es/producto/:slug',
          component: DummyComponent,
          exact: false,
          routes: [{
            path: '/es/producto/:slug/editar',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/es/producto/:slug/ver',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/es/producto/:slug/comentarios/:comment',
            component: DummyComponent,
            exact: false,
            routes: [{
              path: '/es/producto/:slug/comentarios/:comment/editar',
              component: DummyComponent,
              exact: true,
            }],
          }],
        },
        {
          path: '/eu/produktua/:slug',
          component: DummyComponent,
          exact: false,
          routes: [{
            path: '/eu/produktua/:slug/aldatu',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/eu/produktua/:slug/ikusi',
            component: DummyComponent,
            exact: true,
          }, {
            path: '/eu/produktua/:slug/iruzkinak/:comment',
            component: DummyComponent,
            exact: false,
            routes: [{
              path: '/eu/produktua/:slug/iruzkinak/:comment/aldatu',
              component: DummyComponent,
              exact: true,
            }],
          }],
        },
      ],
    },
  ]);
});

test('Generates valid react-router-config complex nested tree', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        routes: [
          {
            paths: '/',
            routes: [{
              paths: {
                en: '/en-test',
                es: '/es-test',
                eu: '/eu-test',
              },
            }],
          },
          {
            paths: {
              en: '/cart',
              es: '/carrito',
              eu: '/saskia',
            },
          },
          {
            paths: '/login',
          },
          {
            paths: {
              en: '/product/:slug',
              es: '/producto/:slug',
              eu: '/produktua/:slug',
            },
          },
          {path: '/checkout/:step?'},
          {path: '*'},
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      routes: [
        {
          path: '/',
          routes: [{
            path: '/en-test',
          }],
        },
        {
          path: '/es/',
          routes: [{
            path: '/es/es-test',
          }],
        },
        {
          path: '/eu/',
          routes: [{
            path: '/eu/eu-test',
          }],
        },
        {path: '/cart'},
        {path: '/es/carrito'},
        {path: '/eu/saskia'},
        {path: '/login'},
        {path: '/es/login'},
        {path: '/eu/login'},
        {path: '/product/:slug'},
        {path: '/es/producto/:slug'},
        {path: '/eu/produktua/:slug'},
        {path: '/checkout/:step?'},
        {path: '*'},
      ],
    },
  ]);
});
