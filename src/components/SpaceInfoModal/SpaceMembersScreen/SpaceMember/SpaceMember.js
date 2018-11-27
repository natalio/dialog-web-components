/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import type { SpaceMember } from '../../types';
import PeerInfoTitle from '../../../PeerInfoTitle/PeerInfoTitle';
import PeerAvatarWithStatus from '../../../PeerAvatarWithStatus/PeerAvatarWithStatus';
import SpaceMemberKick from './SpaceMemberKick';
import styles from './SpaceMember.css';

type Props = {
  uid: number,
  member: SpaceMember,
  canKick: boolean,
  onKick: (peer: Peer) => mixed,
  onClick: (peer: Peer) => mixed
};

class ChatActivityGroupMember extends PureComponent<Props> {
  handleClick = () => {
    this.props.onClick(this.props.member.peerInfo.peer);
  };

  handleKick = (event: SyntheticMouseEvent<>): void => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onKick(this.props.member.peerInfo.peer);
  };

  renderActions() {
    const { uid, canKick, member } = this.props;
    if (!canKick || uid === member.peerInfo.peer.id) {
      return null;
    }

    return (
      <div className={styles.actions}>
        <SpaceMemberKick
          error={member.kickState.error}
          pending={member.kickState.pending}
          onClick={this.handleKick}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.container} onClick={this.handleClick}>
        <PeerAvatarWithStatus
          className={styles.avatar}
          size={40}
          peer={this.props.member.peerInfo}
          status="invisible"
        />
        <div className={styles.body}>
          <div className={styles.titleWrapper}>
            <PeerInfoTitle title={this.props.member.peerInfo.title} titleClassName={styles.title} emojiSize={18} />
          </div>
        </div>
        {this.renderActions()}
      </div>
    );
  }
}

export default ChatActivityGroupMember;
