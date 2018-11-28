```jsx
const initial = {
  isOpen: false,
  space: {
    id: '1001',
    type: 'space',
    avatar: null,
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
const handleClose = () => setState(initial);
const handleSubmit = (space) => {
  console.debug(space);
  setState(initial);
};

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
        />
      : null
  }
</div>
```
