/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo, Group } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import ContactSelector from '../ContactSelector/ContactSelector';
import styles from './AddMembersModal.css';
import HotKeys from '../HotKeys/HotKeys';

export type Props = {
  className?: string,
  group: Group,
  pending: boolean,
  selector: SelectorState<PeerInfo>,
  autoFocus: boolean,
  maxGroupSize: number,
  error: ?string,
  onClose: () => mixed,
  onSubmit: (group: Group, uids: number[]) => mixed,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
};

class AddMembersModal extends PureComponent<Props> {
  handleClose = (): void => {
    if (!this.props.pending) {
      this.props.onClose();
    }
  };

  handleSubmit = (): void => {
    const selected = this.props.selector.getSelected();
    this.props.onSubmit(
      this.props.group,
      selected.map((contact) => contact.peer.id).toArray(),
    );
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit();
    }
  };

  getMembersCount = (): number => {
    const {
      selector,
      group: { members },
    } = this.props;

    return members.length + selector.getSelected().size;
  };

  renderError() {
    const { maxGroupSize, error } = this.props;
    const membersCount = this.getMembersCount();

    if (membersCount > maxGroupSize) {
      return (
        <div className={styles.error}>
          <Text id="CreateNewModal.group.error.max_group_size" />
        </div>
      );
    }

    if (!error) {
      return null;
    }

    return (
      <div className={styles.error}>
        <Text id={error} />
      </div>
    );
  }

  render() {
    const { maxGroupSize } = this.props;
    const membersCount = this.getMembersCount();
    const className = classNames(styles.container, this.props.className);
    const membersCountClassNames = classNames(styles.membersCount, {
      [styles.membersCountError]: membersCount > maxGroupSize,
    });

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.handleClose}>
          <ModalHeader withBorder>
            <Text id="AddMembersModal.title" />
            <small className={membersCountClassNames}>
              {`(${membersCount}/${maxGroupSize})`}
            </small>
            <ModalClose
              onClick={this.handleClose}
              id="add_members_close_button"
            />
          </ModalHeader>
          {this.renderError()}
          <ModalBody className={styles.body}>
            <ContactSelector
              autoFocus={this.props.autoFocus}
              selector={this.props.selector}
              onChange={this.props.onChange}
            />
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Button
              wide
              theme="success"
              rounded={false}
              disabled={
                this.props.selector.getSelected().size === 0 ||
                membersCount > maxGroupSize ||
                this.props.pending
              }
              onClick={this.handleSubmit}
              id="add_members_add_button"
            >
              <Text id="AddMembersModal.button_add" />
            </Button>
          </ModalFooter>
        </Modal>
      </HotKeys>
    );
  }
}

export default AddMembersModal;
