/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 */

const schema = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      title: 'ProfileModal.name',
    },
    nick: {
      type: 'string',
      title: 'ProfileModal.nickname',
    },
    about: {
      type: 'string',
      title: 'ProfileModal.about',
    },
  },
};

const uiSchema = {
  about: {
    'ui:widget': 'textarea',
    'ui:placeholder': 'ProfileModal.about_placeholder',
    'ui:options': {
      lengthLimitCounter: true,
      maxLength: 3000,
      rows: 3,
    },
  },
  nick: {
    'ui:help': 'ProfileModal.nickname_hint',
    'ui:options': {
      prefix: '@',
    },
  },
};

export default {
  schema,
  uiSchema,
};
