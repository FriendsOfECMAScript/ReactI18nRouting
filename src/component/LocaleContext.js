/*
 * This file is part of the ReactI18nRouting package.
 *
 * Copyright (c) 2018-present Friends Of ECMAScript
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import withI18nRouting from './withI18nRouting';

export default withI18nRouting(({i18nRouting, children}) => children(i18nRouting.locale));
