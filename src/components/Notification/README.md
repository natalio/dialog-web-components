Info:

```jsx
initialState = {
  isOpen: false,
};

const onOpen = () => setState({ isOpen: true });
const onClose = () => {
  console.log('confirm closed');
  setState({ isOpen: false });
};

<div>
  <Button theme="info" size="small" onClick={onOpen}>
    Connect microphone
  </Button>
  {state.isOpen ? (
    <Notification
      message="You need to connect microphone to perform call"
      close="OK"
      theme="info"
      onClose={onClose}
    />
  ) : null}
</div>;
```
