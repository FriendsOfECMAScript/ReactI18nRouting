import {getLocale, setLocale} from './../src/locale.js';

test('It can be mutable', () => {
  expect(getLocale()).toBe(null);
  setLocale('es');
  expect(getLocale()).toBe('es');
});
