let currentLocale = null;

export const setLocale = locale => {
  currentLocale = locale;
};

export const getLocale = () => currentLocale;
