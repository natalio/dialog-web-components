/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import type { Props } from './types';
import Modal from '../Modal/Modal';
import HotKeys from '../HotKeys/HotKeys';
import styles from './SpaceInfoModal.css';

class SpaceInfoModal extends PureComponent<Props> {
  static defaultProps = {
    id: 'space_info_modal'
  };

  renderStep() {
    const { step } = this.props;

    switch (step) {
      case 'info':
        return this.renderInfoStep();
      case 'members':
        return this.renderMembersStep();
      case 'addMembers':
        return this.renderAddMembersStep();
      case 'edit':
        return this.renderEditStep();
      case 'avatar':
        return this.renderAvatarStep();
      default:
        return null;
    }
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderStep()}
        </Modal>
      </HotKeys>
    );
  }
}

export default SpaceInfoModal;
