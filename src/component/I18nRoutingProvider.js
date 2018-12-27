import React from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';

import I18nRoutingContext from './I18nRoutingContext';

class I18nRoutingProvider extends React.Component {
  constructor(props) {
    super(props);

    const location = props.history ? props.history.location : {};

    this.state = {
      locale: props.localeFromPath({
        ...location,
        hostname: typeof window !== 'undefined' ? window.location.hostname : '',
      }),
      translatedRoutes: props.defaultTranslatedRoutes || {},
      setTranslatedRoutes: this.setTranslatedRoutes.bind(this),
    };
  }

  componentDidMount() {
    if (!this.props.history) {
      return;
    }

    this.locationChangeUnlisten = this.props.history.listen(location => {
      this.handleLocationChange(location);
    });
  }

  componentWillUnmount() {
    if (!this.locationChangeUnlisten) {
      return;
    }

    this.locationChangeUnlisten();
  }

  setTranslatedRoutes(translatedRoutes) {
    if (isEqual(translatedRoutes, this.state.translatedRoutes)) {
      return;
    }
    this.setState({translatedRoutes});
  }

  handleLocationChange = location => {
    const {localeFromPath} = this.props;

    const locale = localeFromPath({
      ...location,
      hostname: typeof window !== 'undefined' ? window.location.hostname : '',
    });
    this.setState({
      locale,
      translatedRoutes: this.props.defaultTranslatedRoutes,
    });
  };

  render() {
    return (
      <I18nRoutingContext.Provider value={{formatIntlRoute: this.props.formatIntlRoute, ...this.state}}>
        {this.props.children}
      </I18nRoutingContext.Provider>
    );
  }
}

I18nRoutingProvider.propTypes = {
  defaultTranslatedRoutes: PropTypes.object,
  formatIntlRoute: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  localeFromPath: PropTypes.func.isRequired,
};

export default I18nRoutingProvider;
