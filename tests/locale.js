/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {getLocale, setLocale} from './../src/locale.js';

test('It can be mutable', () => {
  expect(getLocale()).toBe(null);
  setLocale('es');
  expect(getLocale()).toBe('es');
});
