import React from 'react';

const LocaleContext = React.createContext();

export const withLocale = Component => props => (
  <LocaleContext.Consumer>
    {({locale}) => <Component {...props} locale={locale}/>}
  </LocaleContext.Consumer>
);

export default LocaleContext;
