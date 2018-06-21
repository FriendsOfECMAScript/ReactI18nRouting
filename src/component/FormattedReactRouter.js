import React from 'react';
import {Link, NavLink, Redirect} from 'react-router-dom';
import {injectIntl} from 'react-intl';

const FormattedRouter = ({intl, children}) => {
  if (!intl.formats.formatIntlRoute) {
    throw new Error(
      'LanguageStrategy formatter is missing, pass formatIntlRoute ' +
        'as parameter to IntlProvider or to BrowserIntlProvider',
    );
  }

  return children;
};

export const FormattedRedirect = injectIntl(
  ({name, params, intl, locale, ...rest}) => {
    return (
      <FormattedRouter intl={intl}>
        <Redirect
          to={intl.formats.formatIntlRoute(
            name,
            params,
            locale ? locale : intl.locale,
          )}
          {...rest}
        />
      </FormattedRouter>
    );
  },
);

export const FormattedNavLink = injectIntl(
  ({name, params, intl, locale, ...rest}) => {
    return (
      <FormattedRouter intl={intl}>
        <NavLink
          to={intl.formats.formatIntlRoute(
            name,
            params,
            locale ? locale : intl.locale,
          )}
          {...rest}
        />
      </FormattedRouter>
    );
  },
);

export const FormattedLink = injectIntl(
  ({name, params, intl, locale, ...rest}) => {
    return (
      <FormattedRouter intl={intl}>
        <Link
          to={intl.formats.formatIntlRoute(
            name,
            params,
            locale ? locale : intl.locale,
          )}
          {...rest}
        />
      </FormattedRouter>
    );
  },
);
