/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 */

const schema = {
  type: 'object',
  properties: {
    age: {
      type: 'integer',
      title: 'Age',
    },
    bio: {
      type: 'string',
      title: 'Bio',
    },
    password: {
      type: 'string',
      title: 'Password',
      minLength: 3,
    },
    telephone: {
      type: 'string',
      title: 'Telephone',
      minLength: 10,
    },
  },
};

const uiSchema = {
  bio: {
    'ui:widget': 'textarea',
  },
  password: {
    'ui:widget': 'password',
    'ui:help': 'Hint: Make it strong!',
  },
  done: {
    'ui:description': 'I read the license agreement and understood everything.',
  },
};

export default {
  schema,
  uiSchema,
};
