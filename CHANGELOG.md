# CHANGELOG

This changelog references the relevant changes done between versions.

To get the diff for a specific change, go to https://github.com/FriendsOfECMAScript/ReactI18nRouting/commit/XXX where XXX is the change hash
To get the diff between two versions, go to https://github.com/FriendsOfECMAScript/ReactI18nRouting/compare/v0.4.0...v0.5.0

- 0.8.0
  - React new Context API is now used to manage state  
  - Decoupled from `react-intl` and `react-redux`
  - [BC BREAK] Removed bridges for redux, browser, in-memory and local storage.
  - [BC BREAK] Removed support for React and ReactDOM < 16.3 (Context API is not supported in those versions)
  - Added React component testing using `react-testing-library`
  - Increased the test code coverage
  - Upgraded all dependencies removing alpha and beta versions
- 0.7.0
  - Added support for using an string-array as the path property as `react-router` does.
- 0.6.0
  - Removed deprecated `react-router-redux` dependency. Updated the `ConnectedRouter` for the `connected-react-router` provided one.
- 0.5.2
  - Fixed unprefixed strategy when URL starts with another locale.
- 0.5.1
  - Fixed PropType reference in the basic usage chapter from documentation.
  - Fixed wrong PropType in the BrowserIntlProvider.
- 0.5.0
  - Added documentation basic structure and written some chapters.
  - Implemented HOC to avoid Boilerplate bootstrapping the Redux browser intl provider.
- 0.4.0
  - Added `FormattedRedirect` and `FormattedNavLink` components.
- 0.3.0
  - Added License, Travis and other useful files to make the library more compliant with OSS.
  - Decoupled `BrowserIntlProvider` from Redux, allowing other implementations like `LocalStorage` or `InMemory`.
  - Refactored the `renderTranslatedRoutes` implementation to allow deeply nested routes configuration object.
- 0.2.0
  - Published two kinds of distributions: `esm` and `commonjs`.
- 0.1.0
  - Initial commit.
