```jsx
const { group } = require('../../fixtures/peerInfo');

<DiscoverCard
  type="group"
  title={group.title}
  shortname={group.shortname}
  description={group.about}
  avatar={group.avatar}
  peer={group.peer}
  members={23}
  onGoToPeer={(peer) => console.log({ peer })}
/>;
```
