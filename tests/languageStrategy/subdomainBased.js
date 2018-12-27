/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';

import subdomainBased from './../../src/languageStrategy/subdomainBased.js';

const DummyComponent = () => <div />;

const languageStrategy = subdomainBased({
  locales: ['en', 'es', 'eu'],
  defaultLocale: 'en',
  subdomains: {
    en: 'english',
    es: 'espanol',
    eu: 'euskera',
  },
  domain: 'localhost',
});

test('It detects locale based in location', () => {
  expect(languageStrategy.localeFromLocation({hostname: 'english.localhost'})).toBe('en');
  expect(languageStrategy.localeFromLocation({hostname: 'espanol.localhost'})).toBe('es');
  expect(languageStrategy.localeFromLocation({hostname: 'euskera.localhost'})).toBe('eu');
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
      path: '/cart',
      component: DummyComponent,
    },
    {
      path: '/',
      component: DummyComponent,
      exact: true,
    },
  ]);
});

test('Generates valid react-router-config tree for secondary language', () => {
  expect(
    languageStrategy.renderRoutes('eu')([
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
      path: '/produktua/:slug',
      component: DummyComponent,
    },
    {
      path: '/saskia',
      component: DummyComponent,
    },
    {
      path: '/',
      component: DummyComponent,
      exact: true,
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
            routes: [
              {
                paths: {
                  en: '/en-test',
                  es: '/es-test',
                  eu: '/eu-test',
                },
              },
            ],
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
          {
            path: '/checkout/:step?',
          },
          {
            path: '*',
          },
        ],
      },
    ]),
  ).toEqual([
    {
      path: '/',
      routes: [
        {path: '/', routes: [{path: '/en-test'}]},
        {path: '/cart'},
        {path: '/login'},
        {path: '/product/:slug'},
        {path: '/checkout/:step?'},
        {path: '*'},
      ],
    },
  ]);
});

test('Generates valid react-router-config complex nested tree, supporting arrays as path', () => {
  expect(
    languageStrategy.renderRoutes('en')([
      {
        path: '/',
        routes: [
          {
            paths: '/',
            routes: [
              {
                paths: {
                  en: '/en-test',
                  es: '/es-test',
                  eu: '/eu-test',
                },
              },
            ],
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
          {
            paths: {
              en: ['/product/:slug', '/products/:category'],
              es: ['/producto/:slug', '/productos/:category'],
              eu: ['/produktua/:slug', '/produktuak/:category'],
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
          routes: [{path: '/en-test'}],
        },
        {path: '/cart'},
        {path: '/login'},
        {path: '/product/:slug'},
        {path: ['/product/:slug', '/products/:category']},
        {path: '/checkout/:step?'},
        {path: '*'},
      ],
    },
  ]);
});
