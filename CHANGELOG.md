# CHANGELOG

This changelog references the relevant changes done between versions.

To get the diff for a specific change, go to https://github.com/FriendsOfECMAScript/ReactI18nRouting/commit/XXX where XXX is the change hash 
To get the diff between two versions, go to https://github.com/FriendsOfECMAScript/ReactI18nRouting/compare/v0.4.0...v0.5.0

* 0.6.0 (Planned release)
    * Made `renderRoutes` method more simple to use.
* 0.5.1
    * Fixed PropType reference in the basic usage chapter from documentation.
    * Fixed wrong PropType in the BrowserIntlProvider.
* 0.5.0
    * Added documentation basic structure and written some chapters.
    * Implemented HOC to avoid Boilerplate bootstrapping the Redux browser intl provider.
* 0.4.0
    * Added `FormattedRedirect` and `FormattedNavLink` components.
* 0.3.0
    * Added License, Travis and other useful files to make the library more compliant with OSS.
    * Decoupled `BrowserIntlProvider` from Redux, allowing other implementations like `LocalStorage` or `InMemory`.
    * Refactored the `renderTranslatedRoutes` implementation to allow deeply nested routes configuration object.
* 0.2.0
    * Published two kinds of distributions: `esm` and `commonjs`.
* 0.1.0
    * Initial commit.
