import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';

class ReduxBrowserIntlProvider extends Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    store: PropTypes.object,
    localeFromPath: PropTypes.func.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object
  };

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    const lang = localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    });
    setLocale(lang);
    this.store.dispatch({
      type: LANGUAGE_CHANGE,
      payload: {
        locale: lang
      }
    });
  };

  componentWillMount() {
    const {store: propsStore} = this.props;
    this.store = propsStore || this.context.store;
  }

  render() {
    return this.props.children(
      this.props.lang,
      this.handleLocationChange
    );
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

export const LANGUAGE_CHANGE = "@@i18n/LANGUAGE_CHANGE";

const defaultSelector = state => state.i18n;

export default connect((state, i18nStateSelector = defaultSelector) => ({
  lang: i18nStateSelector(state).locale
}))(ReduxBrowserIntlProvider);
