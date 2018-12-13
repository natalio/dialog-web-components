Basic Modal:

```jsx
const {
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalClose,
} = require('../../index');

initialState = { isOpen: false };

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });

<div>
  <Button theme="primary" onClick={handleOpen}>
    Open modal
  </Button>
  {state.isOpen ? (
    <Modal onClose={handleClose}>
      <ModalHeader withBorder>
        Simple modal
        <ModalClose onClick={handleClose} />
      </ModalHeader>
      <ModalBody>
        <p>Hello, world!</p>
      </ModalBody>
      <ModalFooter withBorder>Footer content can be placed here</ModalFooter>
    </Modal>
  ) : null}
</div>;
```

Modal with tabs:

```jsx
const { ModalHeader, ModalBodyTabs } = require('../../index');

initialState = { isOpen: false, current: 'first' };

const tabs = [
  { id: 'first', title: 'Tab one title' },
  { id: 'two', title: 'Tab two title' },
  { id: 'three', title: 'Tab three title' },
  { id: 'four', title: 'Tab four title' },
];

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });
const handleChange = (screen) => setState({ current: screen });
const renderCurrentTab = () => {
  return <div>{state.current}</div>;
};

<div>
  <Button theme="primary" onClick={handleOpen}>
    Open modal with tabs
  </Button>
  {state.isOpen ? (
    <Modal onClose={handleClose}>
      <ModalHeader withBorder>Simple modal</ModalHeader>
      <ModalBodyTabs
        tabs={tabs}
        current={state.current}
        onChange={handleChange}
      >
        {renderCurrentTab()}
      </ModalBodyTabs>
    </Modal>
  ) : null}
</div>;
```

Fullscreen Modal:

```jsx
const { ModalHeader, ModalBody, ModalClose } = require('../../index');

initialState = { isOpen: false };

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState({ isOpen: false });

<div>
  <Button theme="primary" onClick={handleOpen}>
    Open fullscreen modal
  </Button>
  {state.isOpen ? (
    <Modal fullscreen onClose={handleClose}>
      <ModalClose onClick={handleClose} />
      <ModalHeader>Simple modal</ModalHeader>
      <ModalBody>
        <p>Hi again. I'm inside fullscreen modal!!!</p>
      </ModalBody>
    </Modal>
  ) : null}
</div>;
```
