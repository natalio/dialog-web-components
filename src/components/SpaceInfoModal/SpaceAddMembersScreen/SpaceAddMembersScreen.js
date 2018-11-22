/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../../entities';
import type { PeerInfo, Group } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../../Button/Button';
import ModalHeader from '../../Modal/ModalHeader';
import ModalBody from '../../Modal/ModalBody';
import ModalFooter from '../../Modal/ModalFooter';
import ModalClose from '../../Modal/ModalClose';
import ContactSelector from '../../ContactSelector/ContactSelector';
import Icon from '../../Icon/Icon';
import styles from './SpaceAddMembersScreen.css';

export type Props = {
  className?: string,
  group: Group,
  pending: boolean,
  selector: SelectorState<PeerInfo>,
  autoFocus: boolean,
  onClose: () => mixed,
  onPrevScreen: () => mixed,
  onSubmit: (gid: number, uids: number[]) => mixed,
  onChange: (selector: SelectorState<PeerInfo>) => mixed
};

class SpaceAddMembersScreen extends PureComponent<Props> {
  handleClose = (): void => {
    if (!this.props.pending) {
      this.props.onClose();
    }
  };

  handlePrevClick = (): void => {
    if (!this.props.pending) {
      this.props.onPrevScreen();
    }
  };

  handleSubmit = (): void => {
    const selected = this.props.selector.getSelected();
    console.log(selected);
    this.props.onSubmit(
      this.props.group.id,
      selected.map((contact) => contact.peer.id).toArray()
    );
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();
      this.handleSubmit();
    }
  };

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <ModalHeader withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevClick}
            className={styles.back}
          />
          <Text id="SpaceInfoModal.title" />
          <ModalClose onClick={this.handleClose} id="space_add_members_close_button" />
        </ModalHeader>
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
            disabled={this.props.pending}
            onClick={this.handleSubmit}
            id="space_add_members_add_button"
          >
            <Text id="SpaceInfoModal.button_add" />
          </Button>
        </ModalFooter>
      </div>
    );
  }
}

export default SpaceAddMembersScreen;
