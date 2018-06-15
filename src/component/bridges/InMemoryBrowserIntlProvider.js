import React from 'react';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';

class InMemoryBrowserIntlProvider extends React.Component {
  static propTypes = {
    localeFromPath: PropTypes.func.isRequired,
  };

  state = {
    lang: 'es',
  };

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    const lang = localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    });
    setLocale(lang);
    this.setState({lang: lang});
  };

  render() {
    return this.props.children(this.state.lang, this.handleLocationChange);
  }
}

export default InMemoryBrowserIntlProvider;
