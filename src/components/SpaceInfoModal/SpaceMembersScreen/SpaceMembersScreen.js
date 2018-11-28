/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Text from '@dlghq/react-l10n/src/Text';
import { List } from 'react-virtualized';
import ModalHeader from '../../Modal/ModalHeader';
import ModalBody from '../../Modal/ModalBody';
import ModalClose from '../../Modal/ModalClose';
import Icon from '../../Icon/Icon';
import ActivityList from '../../ActivityList/ActivityList';
import ActivityListItem from '../../ActivityList/ActivityListItem';
import SpaceMember from './SpaceMember/SpaceMember';
import styles from './SpaceMembersScreen.css';

type Props = {
  uid: number,
  members: SpaceMember[],
  onClose: () => void,
  onPrevScreen: () => void,
  onlineMessage: string
}

class SpaceMembersScreen extends PureComponent<Props> {
  renderRow = ({ index, key, style }: *) => {
    const member = this.props.members[index];

    return (
      <div key={key} style={style}>
        <SpaceMember
          key={member.peerInfo.peer.id}
          uid={this.props.uid}
          member={member}
          canKick={member.canKick}
          onClick={this.props.onMemberClick}
          onKick={this.props.onMemberKick}
        />
      </div>
    );
  };

  render() {
    const WIDTH = 320;
    const ROW_HEIGHT = 56;
    const VISIBLE_ROWS = 8.5;

    return (
      <div className={styles.container}>
        <ModalHeader withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.props.onPrevScreen}
            className={styles.back}
          />
          <Text id="SpaceInfoModal.members.title" />
          <ModalClose onClick={this.props.onClose} id="space_add_members_close_button" />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <ActivityList>
            <ActivityListItem
              icon={{ glyph: 'person', theme: 'warning' }}
              id="activity_list_members"
            >
              {this.props.onlineMessage}
            </ActivityListItem>

            <List
              width={WIDTH}
              height={VISIBLE_ROWS * ROW_HEIGHT}
              rowCount={this.props.members.length}
              rowHeight={ROW_HEIGHT}
              rowRenderer={this.renderRow}
            />

          </ActivityList>
        </ModalBody>
      </div>
    );
  }
}

export default SpaceMembersScreen;
