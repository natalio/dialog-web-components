/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';

import type { Props } from './types';
import Modal from '../Modal/Modal';
import Confirm from '../Confirm/Confirm';
import HotKeys from '../HotKeys/HotKeys';
import SpaceInfoScreen from './SpaceInfoScreen/SpaceInfoScreen';
import SpaceAddMembersScreen from './SpaceAddMembersScreen/SpaceAddMembersScreen';
import SpaceInvitationLinkScreen from './SpaceInvitationLinkScreen';
import SpaceMembersScreen from './SpaceMembersScreen/SpaceMembersScreen';
import styles from './SpaceInfoModal.css';

class SpaceInfoModal extends PureComponent<Props> {
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
      space: {
        name: props.space.name,
        shortname: props.space.shortname,
        avatar: props.space.avatar
      }
    };
  }

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

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    event.preventDefault();
    event.stopPropagation();

    const { screen } = this.state;

    switch (hotkey) {
      case 'Escape':
        if (screen === 'invitationLink' ||
          screen === 'members' ||
          screen === 'addMembers') {
          this.handlePrevScreen();
          break;
        }

        this.props.onClose();
        break;

      default:
      // do nothing
    }
  };

  renderConfirmLeave() {
    return (
      <Confirm
        message="Are you going to leave this space?"
        submit="Leave"
        cancel="Cancel"
        theme="danger"
        onSubmit={this.props.onLeaveSpace}
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
        onSubmit={this.props.onDeleteSpace}
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
            isCreator={this.props.isCreator}
            onlineMessage={this.props.onlineMessage}
            notificationEnabled={this.props.notificationEnabled}
            onNotificationChange={this.props.onNotificationChange}
            onClose={this.props.onClose}
            onAddMemberClick={this.handleAddMembersScreen}
            onInvitationLinkClick={this.handleInvitationLinkScreen}
            onMembersScreenClick={this.handleMembersScreen}
            onLeaveSpaceConfirmClick={this.handleLeaveSpaceConfirmScreen}
            onDeleteSpaceConfirmClick={this.handleDeleteSpaceConfirmScreen}
          />
        );
      case 'members':
        return (
          <SpaceMembersScreen
            uid={this.props.uid}
            onlineMessage={this.props.onlineMessage}
            members={this.props.members}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
          />
        );
      case 'addMembers':
        return (
          <SpaceAddMembersScreen
            spaceId={this.props.space.id}
            autoFocus={this.props.autoFocusAddMember}
            pending={this.props.pendingAddMembers}
            selector={this.props.membersSelector}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onChange={this.props.onMembersChange}
            onSubmit={this.props.onSubmitAddMembers}
          />
        );
      case 'invitationLink':
        return (
          <SpaceInvitationLinkScreen
            link={this.props.invitationLink}
            pending={this.props.invitationLinkPending}
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onRevoke={this.props.onRevoke}
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

    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderMainScreen()}
        </Modal>
      </HotKeys>
    );
  }

  render() {
    return this.renderModal();
  }
}

export default SpaceInfoModal;
