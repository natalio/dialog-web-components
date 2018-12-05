```jsx
const initial = {
  isOpen: false,
  space: {
    id: '1001',
    type: 'space',
    avatar: '',
    name: 'Example space',
    shortname: null,
    about: '',
  },
  isPublicSpaceEnabled: true,
  isPublic: false,
  context: {
    name: {
      error: null,
      pending: false,
    },
    shortname: {
      error: null,
      pending: false,
    },
    avatar: {
      error: null,
      pending: false,
    },
    about: {
      error: null,
      pending: false,
    },
  },
};
initialState = initial;
const handleClose = () => setState({ isOpen: false });
const handleSubmit = () => {
  console.log(state);
  setState(initial);
};
const handleAvatarRemove = () =>
  setState({ space: { ...state.space, avatar: null } });
const handleAvatarEdit = (avatar) =>
  setState({ space: { ...state.space, avatar } });
const handleFieldChange = (value, field) =>
  setState({ space: { ...state.space, [field]: value } });
const handleIsPublicChange = (isPublic) => setState({ isPublic });

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>
    Edit Space
  </Button>
  {state.isOpen ? (
    <EditSpaceModal
      space={state.space}
      shortnamePrefix="https://dlg.im/"
      context={state.context}
      onClose={handleClose}
      onSubmit={handleSubmit}
      onAvatarRemove={handleAvatarRemove}
      onAvatarEdit={handleAvatarEdit}
      onFieldChange={handleFieldChange}
      isChanged={true}
      isPublicSpaceEnabled={state.isPublicSpaceEnabled}
      isPublic={state.isPublic}
      onIsPublicChange={handleIsPublicChange}
    />
  ) : null}
</div>;
```
