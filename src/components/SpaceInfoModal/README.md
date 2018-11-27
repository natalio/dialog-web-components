
```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const initial = {
  isOpen: true,
  selector: PeerInfoSelectorState.create(contacts),
  notificationEnabled: false,
  invitationLink: 0,
  invitationLinkPending: false,
  onlineMessage: '9 members, 3 online',
  isCreator: true,
  addMemberAutofocus: false,
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
const handleNotificationChange = () =>   setState({ notificationEnabled: !state.notificationEnabled });
const handleSubmit = (request) => {
  console.debug(request);
  setState(initial);
};
const handleRevoke = () => setState({ invitationLink: state.invitationLink + 1337 })
const handleLeaveSpace = () => alert('leave space!');
const handleDeleteSpace = () => alert('delete space!');

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
        addMemberAutoFocus={state.addMemberAutoFocus}
        
        notificationEnabled={state.notificationEnabled}
        onNotificationChange={handleNotificationChange}
        
        invitationLink={state.invitationLink}
        invitationLinkPending={state.invitationLinkPending}
        onRevoke={handleRevoke}
        
        onLeaveSpace={handleLeaveSpace}
        onDeleteSpace={handleDeleteSpace}
        
        onlineMessage={state.onlineMessage}
        membersList={123312}
      />
    ) : null
  }
</div>
```
