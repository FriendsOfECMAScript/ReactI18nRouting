import React from 'react';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';

class LocalStorageBrowserIntlProvider extends React.Component {
  static propTypes = {
    localeFromPath: PropTypes.func.isRequired,
  };

  state = {
    lang: localStorage.getItem('locale')
  };

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    localStorage.setItem('locale', localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    }));
    const lang = localStorage.getItem('locale');
    setLocale(lang);
    this.setState({lang: lang});
  };

  render() {
    return this.props.children(this.state.lang, this.handleLocationChange);
  }
}

export default LocalStorageBrowserIntlProvider;
