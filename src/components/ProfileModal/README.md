```jsx
const profile = require('../../fixtures/profileSchema.js').default;
const customProfile = require('../../fixtures/customProfileSchema.js').default;
const initial = {
  isOpen: false,
  uid: 1010101,
  profile: null,
  customProfile: null,
  avatar: null,
  contacts: null,
  context: {
    name: {
      error: null,
      pending: false,
    },
    nick: {
      error: null,
      pending: false,
    },
    about: {
      error: null,
      pending: false,
    },
    avatar: {
      error: null,
      pending: false,
    },
  },
};

initialState = initial;

const openModal = () => {
  setState({ isOpen: true });
  setTimeout(() => {
    setState({
      profile: {
        schema: profile.schema,
        uiSchema: profile.uiSchema,
        value: {
          name: 'Steve',
          nick: 'rodger',
        },
      },
      customProfile: {
        schema: customProfile.schema,
        uiSchema: customProfile.uiSchema,
        value: {},
      },
      contacts: [
        {
          type: 'phone',
          title: 'Mobile phone',
          value: '+71233218855',
        },
        {
          type: 'email',
          title: 'Work email',
          value: 'someuser@domain.com',
        },
      ],
    });
  }, 2000);
};

const onSubmit = (update) => {
  setState({
    context: {
      ...state.context,
      nick: {
        ...state.context.nick,
        pending: true,
      },
    },
  });

  if (state.context.nick.error === null) {
    console.debug('onSubmit with error', update);
    setTimeout(() => {
      setState({
        context: {
          ...state.context,
          nick: {
            pending: false,
            error: 'Ops, this is async error',
          },
        },
      });
    }, 2000);
  } else {
    console.debug('onSubmit', update);
    onClose();
  }
};

const onClose = () => setState(initial);

<div>
  <Button theme="primary" onClick={openModal}>
    Edit profile
  </Button>
  {state.isOpen ? (
    <ProfileModal {...state} onSubmit={onSubmit} onClose={onClose} />
  ) : null}
</div>;
```
