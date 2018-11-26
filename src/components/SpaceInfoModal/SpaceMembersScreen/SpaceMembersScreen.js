/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Text from '@dlghq/react-l10n/src/Text';

import ModalHeader from '../../Modal/ModalHeader';
import ModalBody from '../../Modal/ModalBody';
import ModalFooter from '../../Modal/ModalFooter';
import ModalClose from '../../Modal/ModalClose';
import ActivityInvite from '../../ActivityInvite/ActivityInvite';
import Button from '../../Button/Button';
import Icon from '../../Icon/Icon';
import ActivityProfile from '../../ActivityProfile/ActivityProfile';
import IconButton from '../../IconButton/IconButton';
import ActivityList from '../../ActivityList/ActivityList';
import ActivityListSwitcher from '../../ActivityList/ActivityListSwitcher';
import ActivityListItem from '../../ActivityList/ActivityListItem';
import styles from './SpaceMembersScreen.css';

type Props = {
  onClose: () => void,
  onPrevScreen: () => void,
  onlineMessage: string
}

class SpaceMembersScreen extends PureComponent<Props> {
  render() {
    return (
      <div className={styles.container}>
        <ModalHeader withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.props.onPrevScreen}
            className={styles.back}
          />
          <Text id="SpaceInfoModal.members" />
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
            {this.props.children}
          </ActivityList>
        </ModalBody>
      </div>
    );
  }
}

export default SpaceMembersScreen;
