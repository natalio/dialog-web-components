
```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const initial = {
  isOpen: true,
  selector: PeerInfoSelectorState.create(contacts),
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
const handleClose = () => setState({ isOpen: false });
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
  <Button theme="primary" onClick={handleOpen}>Space info</Button>
  {
    state.isOpen ? (
      <SpaceInfoModal
        isOpen={state.isOpen}
        onClose={handleClose}
        space={space}
        membersSelector={state.selector}
        onMembersChange={(selector) => setState({ selector })}
      />
    ) : null
  }
</div>
```
