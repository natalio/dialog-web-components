/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

// $FlowFixMe
const files = require.context('./svg', false, /.*\.svg$/);

files.keys().forEach(files);
