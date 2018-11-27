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
            onClose={this.props.onClose}
            isCreator={this.props.isCreator}
            onlineMessage={this.props.onlineMessage}
            notificationEnabled={this.props.notificationEnabled}
            onNotificationChange={this.props.onNotificationChange}
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
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onlineMessage={this.props.onlineMessage}
          >
            {this.props.membersList}
          </SpaceMembersScreen>
        );
      case 'addMembers':
        return (
          <SpaceAddMembersScreen
            onPrevScreen={this.handlePrevScreen}
            autoFocus={this.props.addMemberAutoFocus}
            onClose={this.props.onClose}
            selector={this.props.membersSelector}
            onChange={this.props.onMembersChange}
          />
        );
      case 'invitationLink':
        return (
          <SpaceInvitationLinkScreen
            onPrevScreen={this.handlePrevScreen}
            onClose={this.props.onClose}
            onRevoke={this.props.onRevoke}
            link={this.props.invitationLink}
            pending={this.props.invitationLinkPending}
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
