```jsx

const initial = {
  isOpen: true,
  step: 'type',
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

<div>
  <Button theme="primary" onClick={handleOpen}>Create new</Button>
  {
    state.isOpen ? (
      <SpaceInfoModal
        isOpen={state.isOpen}
        step={state.step}
        request={state.request}
        shortnamePrefix="https://dlg.im/@"
        onClose={handleClose}
        onRequestChange={handleRequestChange}
        onStepChange={handleStepChange}
        onSubmit={handleSubmit}
      />
    ) : null
  }
</div>
```
