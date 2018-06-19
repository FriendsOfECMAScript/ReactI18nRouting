import React from 'react';
import {NavLink} from 'react-router-dom';
import {injectIntl} from 'react-intl';

const FormattedNavLink = ({name, params, intl, locale, ...rest}) => {
  if (!intl.formats.formatIntlRoute) {
    throw new Error(
      'LanguageStrategy formatter is missing, pass formatIntlRoute as parameter to IntlProvider or to' +
        ' BrowserIntlProvider',
    );
  }

  return (
    <NavLink
      to={intl.formats.formatIntlRoute(
        name,
        params,
        locale ? locale : intl.locale,
      )}
      {...rest}
    />
  );
};

export default injectIntl(FormattedNavLink);
