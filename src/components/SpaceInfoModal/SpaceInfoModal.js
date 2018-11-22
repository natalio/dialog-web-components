/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import type { Props } from './types';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import HotKeys from '../HotKeys/HotKeys';
import styles from './SpaceInfoModal.css';

class SpaceInfoModal extends PureComponent<Props> {
  static defaultProps = {
    id: 'space_info_modal'
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'info',
      /**
       * our info component and confirmation screen component are both modal;
       * render only one of them;
       */
      confirmationScreen: false,
      space: {
        name: props.space.name,
        shortname: props.space.shortname,
        avatar: props.space.avatar
      }
    };
  }

  handleConfirmationShow = () => {
    this.setState({
      confirmationScreen: true
    });
  };

  handleConfirmationHide = () => {
    this.setState({
      confirmationScreen: false
    });
  };

  renderHeader() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return null;
      case 'members':
        return null;
      case 'addMembers':
        return null;
      case 'edit':
        return null;
      case 'avatar':
        return null;
      default:
        return null;
    }
  }

  renderBody() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return 123321;
      case 'members':
        return null;
      case 'addMembers':
        return null;
      case 'edit':
        return null;
      case 'avatar':
        return null;
      default:
        return null;
    }
  }

  renderMainScreen() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return 123321;
      case 'members':
        return null;
      case 'addMembers':
        return null;
      case 'edit':
        return null;
      case 'avatar':
        return null;
      default:
        return null;
    }
  }

  renderConfirmationScreen() {
    return null;
  }

  renderModal() {
    const { confirmationScreen } = this.state;

    if (confirmationScreen) {
      return this.renderConfirmationScreen();
    }

    return this.renderMainScreen();
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderModal()}
        </Modal>
      </HotKeys>
    );
  }
}

export default SpaceInfoModal;
