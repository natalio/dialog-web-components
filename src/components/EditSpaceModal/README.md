```jsx
const initial = {
  isOpen: false,
  space: {
    id: '1001',
    type: 'space',
    avatar: 'https://picsum.photos/200/200/?1',
    name: 'Example space',
    shortname: null
  },
  context: {
    name: {
      error: null,
      pending: false
    },
    shortname: {
      error: null,
      pending: false
    },
    avatar: {
      error: null,
      pending: false
    }
  }
};
initialState = initial;
const handleClose = () => setState({ isOpen: false });
const handleSubmit = () => {
  console.log(state);
  setState(initial);
};
const handleAvatarRemove = () => setState({ space: { ...state.space, avatar: null } });
const handleAvatarEdit = (avatar) => setState({ space: { ...state.space, avatar } });
const handleFieldChange = (value, field) => setState({ space: { ...state.space, [field]: value } });

<div>
  <Button theme="primary" onClick={() => setState({ isOpen: true })}>Edit Space</Button>
  {
    state.isOpen
      ? <EditSpaceModal
          space={state.space}
          shortnamePrefix="https://dlg.im/"
          context={state.context}
          onClose={handleClose}
          onSubmit={handleSubmit}
          onAvatarRemove={handleAvatarRemove}
          onAvatarEdit={handleAvatarEdit}
          onFieldChange={handleFieldChange}
          isChanged={true}
        />
      : null
  }
</div>
```
