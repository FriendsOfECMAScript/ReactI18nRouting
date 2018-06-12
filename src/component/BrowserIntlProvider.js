import React from 'react';
import {IntlProvider} from 'react-intl';
import PropTypes from 'prop-types';
import {LANGUAGE_CHANGE} from './../reducer';
import {connect} from 'react-redux';

class BrowserIntlProvider extends React.Component {
  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }

  handleLocationChange(location) {
    this.store.dispatch({
      type: LANGUAGE_CHANGE,
      payload: {
        locale: this.props.localeFromPath({
          ...location,
          hostname:
            typeof window !== 'undefined' ? window.location.hostname : '',
        }),
      },
    });
  }

  componentWillMount() {
    const {store: propsStore, history, isSSR} = this.props;
    this.store = propsStore || this.context.store;

    if (!isSSR) {
      this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    }
    this.handleLocationChange(history.location);
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
      <IntlProvider
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

BrowserIntlProvider.propTypes = {
  children: PropTypes.node,
  history: PropTypes.object.isRequired,
  isSSR: PropTypes.bool,
  lang: PropTypes.string,
  localeFromPath: PropTypes.func.isRequired,
  messages: PropTypes.object.isRequired,
  store: PropTypes.object,
};

BrowserIntlProvider.contextTypes = {
  store: PropTypes.object,
};

const defaultSelector = state => state.i18n;

export default connect((state, i18nStateSelector = defaultSelector) => ({
  lang: i18nStateSelector(state).locale,
}))(BrowserIntlProvider);
