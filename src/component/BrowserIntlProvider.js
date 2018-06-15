import React from 'react';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';

import LocaleContext from './LocaleContext.js';

class BrowserIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    handleLocationChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    isSSR: PropTypes.bool,
    lang: PropTypes.string,
    messages: PropTypes.object.isRequired,
  };

  componentWillMount() {
    const {handleLocationChange, history, isSSR} = this.props;

    if (!isSSR) {
      this.unsubscribeFromHistory = history.listen(handleLocationChange);
      handleLocationChange(history.location);
    }
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) {
      this.unsubscribeFromHistory();
    }
  }

  render() {
    const {lang, children, messages, ...rest} = this.props;

    if (!lang) {
      return '';
    }

    return (
      <LocaleContext.Provider value={{locale: lang}}>
        <IntlProvider key={lang} locale={lang} messages={messages[lang]} {...rest}>
          {children}
        </IntlProvider>
      </LocaleContext.Provider>
    );
  }
}

export default BrowserIntlProvider;
