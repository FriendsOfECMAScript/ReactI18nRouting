/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {connect} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';
import BrowserIntlProvider from './../BrowserIntlProvider';

export const LANGUAGE_CHANGE = '@@i18n/LANGUAGE_CHANGE';

class ReduxBrowserIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    localeFromPath: PropTypes.func.isRequired,
  };

  handleLocationChange = location => {
    const {dispatch, localeFromPath} = this.props;

    const lang = localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    });
    setLocale(lang);
    dispatch({
      type: LANGUAGE_CHANGE,
      payload: {
        locale: lang,
      },
    });
  };

  render() {
    return this.props.children(this.props.lang, this.handleLocationChange);
  }
}

const initialState = {
  locale: null,
};

export function i18nReducer(state = initialState, {type, payload} = {}) {
  if (type === LANGUAGE_CHANGE) {
    const {locale} = payload || {};

    return {...state, locale};
  }

  return state;
}

const defaultSelector = state => state.i18n;

export const ConnectedReduxBrowserIntlProvider = connect(
  (state, i18nStateSelector = defaultSelector) => ({
    lang: i18nStateSelector(state).locale,
  }),
)(ReduxBrowserIntlProvider);

export default ({
  children,
  formatIntlRoute,
  history,
  localeFromPath,
  messages,
}) => (
  <ConnectedReduxBrowserIntlProvider localeFromPath={localeFromPath}>
    {(lang, handleLocationChange) => (
      <BrowserIntlProvider
        formats={{formatIntlRoute}}
        handleLocationChange={handleLocationChange}
        history={history}
        lang={lang}
        messages={messages}
      >
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </BrowserIntlProvider>
    )}
  </ConnectedReduxBrowserIntlProvider>
);
