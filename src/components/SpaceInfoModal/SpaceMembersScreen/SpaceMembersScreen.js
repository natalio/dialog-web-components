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
import styles from '../SpaceInfoModal.css';
import ActivityProfile from '../../ActivityProfile/ActivityProfile';
import IconButton from '../../IconButton/IconButton';
import ActivityList from '../../ActivityList/ActivityList';
import ActivityListSwitcher from '../../ActivityList/ActivityListSwitcher';
import ActivityListItem from '../../ActivityList/ActivityListItem';

type Props = {
  onClose: () => void,
  onPrevScreen: () => void,
  onlineMessage: string
}

class SpaceInfoScreen extends PureComponent<Props> {
  render() {
    return (
      <div className={styles.invitationWrapper}>
        <ModalHeader withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.props.onPrevScreen}
            className={styles.back}
          />
          <Text id="SpaceInfoModal.members" />
          <ModalClose onClick={this.props.onClose} id="space_add_members_close_button" />
        </ModalHeader>
        <ModalBody className={styles.invitationBody}>
          <div className={styles.activityProfileWrapper}>
            <ActivityList>
              <ActivityListItem
                icon={{ glyph: 'person', theme: 'warning' }}
                id="activity_list_members"
              >
                {this.props.onlineMessage}
              </ActivityListItem>
            </ActivityList>
          </div>
        </ModalBody>
      </div>
    );
  }
}

export default SpaceInfoScreen;
