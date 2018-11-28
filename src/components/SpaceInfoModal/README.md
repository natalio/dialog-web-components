
```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const space = {
  avatar: 'https://avatars2.githubusercontent.com/u/19669610',
  bigAvatar: 'https://avatars2.githubusercontent.com/u/19669610',
  name: 'subSpace',
  shortname: 'subspace',
  creator: 'Steve Rodgers',
  placeholder: 'blue',
  type: 'space',
  adminId: 13
};

const members = contacts.map((member) => {
  return {
    canKick: true,
    kickState: {
      pending: false,
      error: null
    },
    peerInfo: {
      avatar: member.avatar,
      bigAvatar: member.avatar,
      peer: member.peer,
      placeholder: 'yellow',
      title: member.title,
      type: 'user',
      userName: null
    }
  }
})

const initial = {
  uid: 1337,
  isOpen: true,
  selector: PeerInfoSelectorState.create(contacts),
  notificationEnabled: false,
  invitationLink: 0,
  invitationLinkPending: false,
  onlineMessage: '9 members, 3 online',
  isCreator: true,
  isAdmin: true,
  addMemberAutofocus: false,
  members: members,
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
const onSubmitAddMembers = () => console.log(state.selector);
const handleMemberClick = (peer) => console.log(peer);
const handleMemberKick = (peer) => console.log(peer);

<div>
  <Button theme="primary" onClick={handleOpen}>Space info</Button>
  {
    state.isOpen ? (
      <SpaceInfoModal
        isOpen={state.isOpen}
        uid={state.uid}
        onClose={handleClose}
        space={space}
        
        isCreate={state.isCreator}
        isAdmin={state.isAdmin}
        
        membersSelector={state.selector}
        onMembersChange={(selector) => setState({ selector })}
        autoFocusAddMember={state.autoFocusAddMember}
        onSubmitAddMembers={onSubmitAddMembers}
        pendingAddMembers={false}
        
        notificationEnabled={state.notificationEnabled}
        onNotificationChange={handleNotificationChange}
        
        invitationLink={state.invitationLink}
        invitationLinkPending={state.invitationLinkPending}
        onRevoke={handleRevoke}
        
        onLeaveSpace={handleLeaveSpace}
        onDeleteSpace={handleDeleteSpace}
        
        onlineMessage={state.onlineMessage}
        members={state.members}
        onMemberClick={handleMemberClick}
        onMemberKick={handleMemberKick}
      />
    ) : null
  }
</div>
```
