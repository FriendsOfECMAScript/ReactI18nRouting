import React from 'react';

import I18nRoutingContext from '../I18nRoutingContext';

export const withI18nRouting = Component => props => (
  <I18nRoutingContext.Consumer>{context => <Component i18nRouting={context} {...props} />}</I18nRoutingContext.Consumer>
);

export default withI18nRouting(I18nRouting);
