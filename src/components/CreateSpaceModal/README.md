```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const initial = {
  isOpen: false,
  request: {
    title: '',
    shortname: '',
    avatar: null,
    members: PeerInfoSelectorState.create(contacts),
    about: '',
  },
  isPublicSpaceEnabled: true,
};
initialState = initial;

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });
const handleRequestChange = (request) => setState({ request });
const handleStepChange = (step) => setState({ step });
const handleSubmit = () => {
  console.debug(state);
  setState(initial);
};
const handleAvatarRemove = () =>
  setState({ request: { ...state.request, avatar: null } });
const handleAvatarEdit = (avatar) =>
  setState({ request: { ...state.request, avatar } });

<div>
  <Button theme="primary" onClick={handleOpen}>
    Create new space
  </Button>
  {state.isOpen ? (
    <CreateSpaceModal
      isOpen={state.isOpen}
      step={state.step}
      request={state.request}
      isPublicSpaceEnabled={state.isPublicSpaceEnabled}
      shortnamePrefix="https://dlg.im/@"
      onClose={handleClose}
      onRequestChange={handleRequestChange}
      onStepChange={handleStepChange}
      onSubmit={handleSubmit}
      onAvatarRemove={handleAvatarRemove}
      onAvatarEdit={handleAvatarEdit}
    />
  ) : null}
</div>;
```
