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
import SpaceInfoScreen from './SpaceInfoScreen/SpaceInfoScreen';
import SpaceAddMembersScreen from './SpaceAddMembersScreen/SpaceAddMembersScreen';
import AddMembersModal from '../AddMembersModal/AddMembersModal';
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
       * our info component and confirmation component are both modal;
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

  handlePrevScreenClick = (): void => {
    this.setState({
      screen: 'info'
    });
  };

  handleAddMembersScreenClick = (): void => {
    this.setState({
      screen: 'addMembers'
    });
  };

  renderMainScreen() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return (
          <SpaceInfoScreen
            isCreator={false} //this
            onClose={this.props.onClose}
            onAddMemberClick={this.handleAddMembersScreenClick}
          />
        );
      case 'members':
        return null;
      case 'addMembers':
        return (
          <SpaceAddMembersScreen
            selector={this.props.membersSelector}
            onChange={this.props.onMembersChange}
            onPrevScreen={this.handlePrevScreenClick}
            onClose={this.props.onClose}
          />
        );
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
