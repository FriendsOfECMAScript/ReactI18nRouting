export const LANGUAGE_CHANGE = '@@i18n/LANGUAGE_CHANGE';

const initialState = {
  locale: null,
};

export function i18nReducer(state = initialState, {type, payload} = {}) {
  if (type === LANGUAGE_CHANGE) {
    const {locale} = payload || {};

    return {...state, locale};
  }

  return state;
}

export const getLang = state => state.i18n.locale;
