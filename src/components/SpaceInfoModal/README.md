
```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const initial = {
  isOpen: true,
  step: 'info',
  request: {
    type: 'group',
    title: '',
    shortname: '',
    about: '',
    avatar: null,
    members: PeerInfoSelectorState.create(contacts),
  }
};
initialState = initial;

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState(initial);
const handleRequestChange = (request) => setState({ request });
const handleStepChange = (step) => setState({ step });
const handleSubmit = (request) => {
  console.debug(request);
  setState(initial);
};

const space = {
  id: 1337,
  name: 'Sub space',
  shortname: 'subspace',
  avatar: 'https://picsum.photos/200/200/?1'
};

<div>
  <Button theme="primary" onClick={handleOpen}>Create new</Button>
  {
    state.isOpen ? (
      <SpaceInfoModal
        isOpen={state.isOpen}
        space={space}
      />
    ) : null
  }
</div>
```
