import withI18nRouting from './withI18nRouting';

export default withI18nRouting(({i18nRouting, children}) => children(i18nRouting.locale));
