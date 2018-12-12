import React from 'react';

class I18nRouting extends React.Component {
  state = {};

  static getDerivedStateFromProps(props) {
    if (props.translatedSlugs.es === props.i18nRouting.translatedRoutes.es) {
      return {};
    }

    props.i18nRouting.setTranslatedRoutes(props.translatedSlugs);
    return {};
  }

  render() {
    return <React.Fragment />;
  }
}

export default I18nRouting;