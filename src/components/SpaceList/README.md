```jsx
initialState = { selected: null };
const handlePick = (selected) => setState({ selected });

<SpaceList
  selected={state.selected}
  items={[
    {
      id: '1',
      type: 'private',
      avatar: '',
      title: 'subspace',
      shortname: null,
      about: 'some subspace info',
      ownerId: 2077704281,
      placeholder: 'blue',
    },
    {
      id: '2',
      type: 'private',
      avatar: '',
      title: 'true space',
      shortname: null,
      about: 'some true space info',
      ownerId: 2077704281,
      placeholder: 'lblue',
    },
    {
      id: '3',
      type: 'private',
      avatar: '',
      title: 'deep space',
      shortname: null,
      about: 'some deep space info',
      ownerId: 2077704281,
      placeholder: 'purple',
    },
    {
      id: '4',
      type: 'public',
      avatar: '',
      title: 'backspace',
      shortname: 'backspace',
      about: 'some backspace info',
      ownerId: 2077704281,
      placeholder: 'yellow',
    },
  ]}
  spaceActions={[
    {
      handleClick: () => {
        alert('clicked!');
      },
      text: 'click me',
    },
    {
      handleClick: () => {
        alert('clicked2!');
      },
      text: 'click me 2',
    },
  ]}
  unreaded={['1', '2']}
  onPick={handlePick}
/>;
```
