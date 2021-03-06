/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

/* eslint-disable */
const contacts = require('./contacts.json');

const userPeers = [
  {
    avatar: 'https://avatars1.githubusercontent.com/u/930121',
    title: 'Oleg Shilov 💣',
    placeholder: 'lblue',
    type: 'user',
    userName: 'olegshilov',
    about: 'front-end @ dialog',
    peer: {
      id: 2,
      type: 'user',
      key: 'u2',
    },
  },
  {
    avatar: '',
    title: 'Gusakov Nikita',
    placeholder: 'red',
    type: 'user',
    userName: 'gusnkt',
    about: '',
    peer: {
      id: 1,
      type: 'user',
      key: 'u1',
    },
  },
];

const space = {
  avatar: 'https://avatars2.githubusercontent.com/u/19669610',
  title: 'subSpace',
  placeholder: 'blue',
  type: 'space',
  shortName: 'subspace',
  peer: {
    id: 10101,
    type: 'space',
  },
};

const group = {
  avatar: 'https://avatars2.githubusercontent.com/u/19669610',
  title: 'Dialog',
  placeholder: 'blue',
  type: 'group',
  about:
    'Dialog is a handy and feature rich enterprise multi-device messenger available for server or cloud – Slack-like, but not Slack-limited.',
  peer: {
    id: 10101,
    type: 'group',
  },
  members: [
    { peerInfo: contacts[0] },
    { peerInfo: contacts[1] },
    { peerInfo: contacts[3] },
  ],
};

const channel = {
  avatar: null,
  title: 'Kirsan news 😡',
  placeholder: 'yellow',
  type: 'channel',
  about:
    'Posts from the RSS feed on the official site of FIDE President Kirsan Ilyumzhinov www.kirsan.today',
  userName: 'kirsan_news_eng',
  peer: {
    id: 111,
    type: 'group',
  },
  members: [
    { peerInfo: contacts[0] },
    { peerInfo: contacts[1] },
    { peerInfo: contacts[3] },
    { peerInfo: contacts[4] },
    { peerInfo: contacts[5] },
    { peerInfo: contacts[6] },
  ],
};

const bot = {
  avatar: null,
  title: 'Security Bot',
  placeholder: 'red',
  type: 'bot',
  userName: 'security_bot',
  about:
    "The security bot sees a world where you're not afraid of opening the wrong link. This security integration works silently in the background alerting users when a malicious or unwanted link has been detected in a public channel.",
  peer: {
    id: 12239,
    type: 'user',
  },
};

module.exports = {
  user: userPeers[0],
  users: userPeers,
  group,
  channel,
  bot,
  space,
};
