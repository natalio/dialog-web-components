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
import ActivityProfile from '../../ActivityProfile/ActivityProfile';
import IconButton from '../../IconButton/IconButton';
import Button from '../../Button/Button';
import styles from './SpaceInfoScreen.css';

type Props = {
  onClose: () => void,
  isCreator: boolean,
  onAddMemberClick: () => void
}

class SpaceInfoScreen extends PureComponent<Props> {
  renderFooter() {
    const { isCreator } = this.props;

    if (isCreator) {
      return (
        <Button
          wide
          theme="danger"
          rounded={false}
          // loading={this.isPending()}
          // disabled={!this.isChanged() || this.isPending()}
          onClick={this.handleSubmit}
          id="space_info_screen_delete_space_button"
        >
          <Text id="SpaceInfoModal.delete" />
        </Button>
      );
    }

    return (
      <Button
        wide
        theme="danger"
        rounded={false}
        // loading={this.isPending()}
        // disabled={!this.isChanged() || this.isPending()}
        onClick={this.handleSubmit}
        id="space_info_screen_leave_space_button"
      >
        <Text id="SpaceInfoModal.leave" />
      </Button>
    );
  }

  render() {
    const group = {
      name: 'Sub space',
      shortname: 'subspace',
      creator: 'Steve Rodgers',
      about: 'some about',
      avatar: null,
      bigAvatar: null,
      placeholder: 'lblue',
      adminId: 1001
    };
    const onAboutEdit = () => console.debug('Edit about action');

    return (
      <div className={styles.container}>
        <ModalBody className={styles.modalBody}>
          <ModalClose
            className={styles.modalClose}
            // pending={this.isPending()}
            onClick={this.props.onClose}
            id="space_info_screen_close_button"
          />

          <div className={styles.activityProfileWrapper}>
            <ActivityProfile
              info={group}
              onAboutEdit={onAboutEdit}
              type="group"
            >
              <div style={{ margin: '0px 5px', display: 'inline-block' }}>
                <IconButton
                  glyph="add_member"
                  key="more"
                  size="large"
                  onClick={this.props.onAddMemberClick}
                />
              </div>
            </ActivityProfile>
          </div>
        </ModalBody>
        <ModalFooter className={styles.modalFooter}>
          {this.renderFooter()}
        </ModalFooter>
      </div>
    );
  }
}

export default SpaceInfoScreen;
