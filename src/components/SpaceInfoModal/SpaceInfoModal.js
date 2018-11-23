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
import Confirm from '../Confirm/Confirm';
import HotKeys from '../HotKeys/HotKeys';
import SpaceInfoScreen from './SpaceInfoScreen/SpaceInfoScreen';
import SpaceAddMembersScreen from './SpaceAddMembersScreen/SpaceAddMembersScreen';
import SpaceInvitationLinkScreen from './SpaceInvitationLinkScreen';
import SpaceMembersScreen from './SpaceMembersScreen/SpaceMembersScreen';
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
      confirmScreen: 'leave',
      /**
       * our info component and confirmation component are both modal;
       * render only one of them;
       */
      confirmEnabled: false,
      notificationEnabled: false,
      invitationLink: 'someLink',
      invitationLinkPending: false,
      onlineMessage: '9 members, 3 online',
      space: {
        name: props.space.name,
        shortname: props.space.shortname,
        avatar: props.space.avatar
      }
    };
  }

  handleNotificationChange = (): void => {
    const { notificationEnabled } = this.state;

    this.setState({
      notificationEnabled: !notificationEnabled
    });
  };

  handleConfirmShow = () => {
    this.setState({
      confirmEnabled: true
    });
  };

  handleConfirmHide = () => {
    this.setState({
      confirmEnabled: false
    });
  };

  handleLeaveSpaceConfirmScreen = (): void => {
    this.setState({ confirmScreen: 'leave' }, () => {
      this.handleConfirmShow();
    });
  };

  handleDeleteSpaceConfirmScreen = (): void => {
    this.setState({ confirmScreen: 'delete' }, () => {
      this.handleConfirmShow();
    });
  };

  handlePrevScreen = (): void => {
    this.setState({
      screen: 'info'
    });
  };

  handleAddMembersScreen = (): void => {
    this.setState({
      screen: 'addMembers'
    });
  };

  handleInvitationLinkScreen = (): void => {
    this.setState({
      screen: 'invitationLink'
    });
  };

  handleMembersScreen = (): void => {
    this.setState({
      screen: 'members'
    });
  };

  handleRevoke = (): void => {
    console.log('revoke link');
  };

  handleLeaveSpace = (): void => {
    console.log('leave');
  };

  handleDeleteSpace = (): void => {
    console.log('delete');
  };

  renderConfirmLeave() {
    return (
      <Confirm
        message="Are you going to leave this space?"
        submit="Leave"
        cancel="Cancel"
        theme="danger"
        onSubmit={this.handleLeaveSpace}
        onClose={this.handleConfirmHide}
      />
    );
  }

  renderConfirmDelete() {
    return (
      <Confirm
        message="Are you going to delete this space?"
        submit="Delete"
        cancel="Cancel"
        theme="danger"
        onSubmit={this.handleDeleteSpace}
        onClose={this.handleConfirmHide}
      />
    );
  }

  renderMainScreen() {
    const { screen } = this.state;

    switch (screen) {
      case 'info':
        return (
          <SpaceInfoScreen
            isCreator={false} //this
            onlineMessage={this.state.onlineMessage}
            onClose={this.props.onClose}
            notificationEnabled={this.state.notificationEnabled}
            onAddMemberClick={this.handleAddMembersScreen}
            onInvitationLinkClick={this.handleInvitationLinkScreen}
            onMembersScreenClick={this.handleMembersScreen}
            onNotificationChange={this.handleNotificationChange}
            onLeaveSpaceConfirmClick={this.handleLeaveSpaceConfirmScreen}
            onDeleteSpaceConfirmClick={this.handleDeleteSpaceConfirmScreen}
          />
        );
      case 'members':
        return (
          <SpaceMembersScreen
            onlineMessage={this.state.onlineMessage}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
          />
        );
      case 'addMembers':
        return (
          <SpaceAddMembersScreen
            selector={this.props.membersSelector}
            onChange={this.props.onMembersChange}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
          />
        );
      case 'edit':
        return null;
      case 'avatar':
        return null;
      case 'invitationLink':
        return (
          <SpaceInvitationLinkScreen
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onRevoke={this.handleRevoke}
            link={this.state.invitationLink}
            pending={this.state.invitationLinkPending}
          />
        );
      default:
        return null;
    }
  }

  renderConfirm() {
    const { confirmScreen } = this.state;

    switch (confirmScreen) {
      case 'leave':
        return this.renderConfirmLeave();
      case 'delete':
        return this.renderConfirmDelete();
      default:
        return null;
    }
  }

  renderModal() {
    const { confirmEnabled } = this.state;

    if (confirmEnabled) {
      return this.renderConfirm();
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
