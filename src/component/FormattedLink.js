import React from 'react';
import {Link} from 'react-router-dom';
import {injectIntl} from 'react-intl';

const FormattedLink = ({name, params, intl, locale, ...rest}) => {
  if (!intl.formats.formatIntlRoute) {
    throw new Error(
      'LanguageStrategy formatter missing, pass formatIntlRoute as parameter to IntlProvider or to BrowserIntlProvider',
    );
  }

  return (
    <Link
      to={intl.formats.formatIntlRoute(name, params, locale ? locale : intl.locale)}
      {...rest}
    />
  );
};

export default injectIntl(FormattedLink);
