```jsx
const { group, user, channel, bot } = require('../../fixtures/peerInfo');
initialState = {
  pending: false,
  error: null,
  items: [
    {
      ...group,
      description: group.about,
      members: 23,
      creator: user.title,
    },
    {
      ...channel,
      description: channel.about,
      shortname: channel.userName,
      members: 420,
    },
    {
      ...user,
      description: user.about,
      shortname: user.userName,
    },
    {
      ...bot,
      description: bot.about,
      shortname: bot.userName,
    },
  ],
};

const onGoToPeer = (peer) => console.debug(`DISCOVER: go to peer: ${peer.id}`);
const onCreateNew = () => alert('Open create new modal');

const handlePendingToggle = () => {
  setState({ pending: !state.pending });
};
const handleErrorToggle = () => {
  setState({
    error: state.error ? null : 'Something went wrong here! Try again.',
  });
};

<div>
  <div className="styleguide__buttons">
    <Button onClick={handlePendingToggle} theme="warning" size="small">
      Toggle pending
    </Button>
    <Button onClick={handleErrorToggle} theme="danger" size="small">
      Toggle error
    </Button>
  </div>
  <hr />
  <Discover
    error={state.error}
    pending={state.pending}
    items={state.items}
    onCreateNew={onCreateNew}
    onGoToPeer={onGoToPeer}
  />
</div>;
```
