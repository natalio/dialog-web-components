/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import ModalClose from '../Modal/ModalClose';
import EditSpaceModalForm from './EditSpaceModalForm';
import ImageEdit from '../ImageEdit/ImageEdit';
import Icon from '../Icon/Icon';
import styles from './EditSpaceModal.css';
import type { Props, State, Step } from './types';
import HotKeys from '../HotKeys/HotKeys';

class EditSpaceModal extends PureComponent<Props, State> {
  static defaultProps = {
    isPublicSpaceEnabled: true,
    aboutMaxLength: 3000,
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'info',
      avatar: null,
    };
  }

  handleAvatarEdit = (avatar: File): void => {
    fileToBase64(avatar, (newAvatar) => {
      this.props.onAvatarEdit(newAvatar);

      this.setState({
        screen: 'info',
        avatar: null,
      });
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.setState({ avatar });

    this.handleScreenChange('avatar');
  };

  handleGoBack = (): void => {
    this.setState({ screen: 'info' });
  };

  handleScreenChange = (screen: Step) => {
    this.setState({ screen });
  };

  handleSubmit = (event?: SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit();
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      if (this.state.screen !== 'avatar') {
        this.handleSubmit();
      }
    }
  };

  isPending(): boolean {
    const {
      context: { avatar, name, shortname, about },
    } = this.props;

    return avatar.pending || name.pending || shortname.pending || about.pending;
  }

  renderHeader() {
    switch (this.state.screen) {
      case 'info':
        return (
          <ModalHeader withBorder>
            <Text id="EditSpaceModal.title" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="edit_space_close_button"
            />
          </ModalHeader>
        );
      case 'avatar':
        return (
          <ModalHeader withBorder>
            <Icon
              glyph="arrow_back"
              onClick={this.handleGoBack}
              className={styles.back}
              id="edit_space_back_button"
              size={28}
            />
            <Text id="EditSpaceModal.avatar" />
            <ModalClose
              pending={this.isPending()}
              onClick={this.props.onClose}
              id="edit_space_close_button"
            />
          </ModalHeader>
        );
      default:
        return null;
    }
  }

  renderForm() {
    return (
      <EditSpaceModalForm
        space={this.props.space}
        name={{ ...this.props.context.name, value: this.props.space.name }}
        shortname={{
          ...this.props.context.shortname,
          value: this.props.space.shortname,
        }}
        avatar={this.props.space.avatar}
        about={{ ...this.props.context.about, value: this.props.space.about }}
        aboutMaxLength={this.props.aboutMaxLength}
        shortnamePrefix={this.props.shortnamePrefix}
        isPublicSpaceEnabled={this.props.isPublicSpaceEnabled}
        isPublic={this.props.isPublic}
        onChange={this.props.onFieldChange}
        onSubmit={this.handleSubmit}
        onAvatarChange={this.handleAvatarChange}
        onAvatarRemove={this.props.onAvatarRemove}
        onIsPublicChange={this.props.onIsPublicChange}
      />
    );
  }

  renderAvatarEdit() {
    if (!this.state.avatar) {
      return null;
    }

    return (
      <ImageEdit
        image={this.state.avatar}
        type="circle"
        size={250}
        height={400}
        onSubmit={this.handleAvatarEdit}
      />
    );
  }

  renderBody() {
    switch (this.state.screen) {
      case 'info':
        return (
          <ModalBody className={styles.body}>{this.renderForm()}</ModalBody>
        );
      case 'avatar':
        return (
          <ModalBody className={styles.body}>
            {this.renderAvatarEdit()}
          </ModalBody>
        );
      default:
        return null;
    }
  }

  renderFooter() {
    if (this.state.screen === 'info') {
      return (
        <ModalFooter className={styles.footer}>
          <Button
            wide
            theme="success"
            rounded={false}
            loading={this.isPending()}
            disabled={!this.props.isChanged || this.isPending()}
            onClick={this.handleSubmit}
            id="edit_space_submit_button"
          >
            <Text id="EditSpaceModal.submit" />
          </Button>
        </ModalFooter>
      );
    }

    return null;
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <HotKeys onHotKey={this.handleHotkey}>
        <Modal className={className} onClose={this.props.onClose}>
          {this.renderHeader()}
          {this.renderBody()}
          {this.renderFooter()}
        </Modal>
      </HotKeys>
    );
  }
}

export default EditSpaceModal;
