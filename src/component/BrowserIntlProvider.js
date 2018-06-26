/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import React from 'react';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';

class BrowserIntlProvider extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    formats: PropTypes.object.isRequired,
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
    const {children, formats, lang, messages, ...rest} = this.props;

    if (!lang) {
      return '';
    }

    return (
      <IntlProvider
        formats={formats}
        key={lang}
        locale={lang}
        messages={messages[lang]}
        {...rest}
      >
        {children}
      </IntlProvider>
    );
  }
}

export default BrowserIntlProvider;
