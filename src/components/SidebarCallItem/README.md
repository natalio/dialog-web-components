```jsx
const { users, group } = require('../../fixtures/peerInfo');
const now = new Date();

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarCallItem
    call={{
      date: new Date(),
      duration: 1232,
      id: '10001',
      initiator: users[0],
      recipient: users[1],
      isAnswered: false,
      isFinished: false,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: new Date().setDate(now.getDate() - 1),
      duration: 112,
      id: '10002',
      initiator: users[1],
      recipient: group,
      isAnswered: false,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: new Date().setDate(now.getDate() - 5),
      duration: 121232,
      id: '10003',
      initiator: users[1],
      recipient: users[0],
      isAnswered: true,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: new Date().setDate(now.getDate() - 10),
      duration: 1211232,
      id: '10003',
      initiator: users[0],
      recipient: users[1],
      isAnswered: true,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
</div>;
```
