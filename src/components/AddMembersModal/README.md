```jsx
const { PeerInfoSelectorState } = require('../../entities');
const { group } = require('../../fixtures/peerInfo.js');
const contacts = require('../../fixtures/contacts.json');
const initial = {
  isOpen: false,
  selector: PeerInfoSelectorState.create(contacts),
  pending: false,
};
initialState = initial;

const onOpen = () => setState({ isOpen: true });
const onClose = () => setState(initial);
const onSubmit = (result) => {
  console.log('onSubmit', result);
  onClose();
};
const onChange = (selector) => setState({ selector });

<div>
  <Button theme="primary" onClick={onOpen}>
    Add member
  </Button>
  {state.isOpen ? (
    <AddMembersModal
      selector={state.selector}
      group={group}
      maxGroupSize={4}
      onChange={onChange}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  ) : null}
</div>;
```
