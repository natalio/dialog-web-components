```jsx
const { users, group } = require('../../fixtures/peerInfo');
const now = new Date();
const yesterday = new Date().setDate(now.getDate() - 1);
const daysAgoThree = new Date().setDate(now.getDate() - 3);
const daysAgoFive = new Date().setDate(now.getDate() - 5);
const user1 = users[0];
const user2 = users[1];

<div style={{ width: 270, background: '#f5f5f5' }}>
  <SidebarCallItem
    call={{
      date: new Date(),
      duration: 1232,
      id: '10001',
      initiator: user1,
      recipient: user2,
      isAnswered: false,
      isFinished: false,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: yesterday,
      duration: 112,
      id: '10002',
      initiator: user2,
      recipient: group,
      isAnswered: false,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: daysAgoThree,
      duration: 121232,
      id: '10003',
      initiator: user2,
      recipient: user1,
      isAnswered: true,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
  <SidebarCallItem
    call={{
      date: daysAgoFive,
      duration: 1211232,
      id: '10004',
      initiator: user1,
      recipient: user2,
      isAnswered: true,
      isFinished: true,
    }}
    uid={1}
    onSelect={console.debug}
  />
</div>;
```
