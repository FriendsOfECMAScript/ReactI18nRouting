import React from 'react';
import PropTypes from 'prop-types';

import {setLocale} from './../../locale.js';

export class LocalStorageBrowserIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.func.isRequired,
    localeFromPath: PropTypes.func.isRequired,
  };

  state = {
    lang: localStorage.getItem('locale'),
  };

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    localStorage.setItem(
      'locale',
      localeFromPath({
        ...location,
        hostname: typeof window !== 'undefined' ? window.location.hostname : '',
      }),
    );
    const locale = localStorage.getItem('locale');
    setLocale(locale);
    this.setState({lang: locale});
  };

  render() {
    return this.props.children(this.state.lang, this.handleLocationChange);
  }
}

export default ({
  children,
  formatIntlRoute,
  history,
  localeFromPath,
  messages,
}) => (
  <LocalStorageBrowserIntlProvider localeFromPath={localeFromPath}>
    {(lang, handleLocationChange) => (
      <BrowserIntlProvider
        formats={{formatIntlRoute}}
        handleLocationChange={handleLocationChange}
        history={history}
        lang={lang}
        messages={messages}
      >
        {children}
      </BrowserIntlProvider>
    )}
  </LocalStorageBrowserIntlProvider>
);
