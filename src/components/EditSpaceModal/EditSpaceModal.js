/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
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
import type { Props, State } from './types';
import HotKeys from '../HotKeys/HotKeys';

class EditSpaceModal extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      screen: 'info',
      space: {
        name: props.space.name,
        shortname: props.space.shortname,
        avatar: props.space.avatar
      }
    };
  }

  handleChange = (value: mixed, { target }: $FlowIssue) => {
    this.setState(({ space }) => {
      return {
        space: {
          ...space,
          [target.name]: value
        }
      };
    });
  };

  handleAvatarChange = (avatar: File): void => {
    this.setState(({ space }) => {
      return {
        screen: 'info',
        space: {
          ...space,
          avatar
        }
      };
    });
  };

  handleAvatarRemove = (): void => {
    this.setState(({ space }) => {
      return {
        space: {
          ...space,
          avatar: null
        }
      };
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.setState(({ space }) => {
      return {
        screen: 'avatar',
        space: {
          ...space,
          avatar
        }
      };
    });
  };

  handleGoToInfo = (): void => {
    this.setState(({ space }) => {
      return {
        screen: 'info',
        space: {
          ...space,
          avatar: this.props.space.avatar
        }
      };
    });
  };

  handleSubmit = (event?: SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }

    this.props.onSubmit(this.props.space, this.state.space);
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

  isChanged(): boolean {
    const { context: { avatar, name, shortname } } = this.props;

    return this.state.space.name !== name.value ||
      this.state.space.shortname !== shortname.value ||
      this.state.space.avatar !== avatar.value;
  }

  isPending(): boolean {
    const { context: { avatar, name, shortname } } = this.props;

    return avatar.pending || name.pending || shortname.pending;
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
              onClick={this.handleGoToInfo}
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
        name={{ ...this.props.context.name, value: this.state.space.name }}
        shortname={{ ...this.props.context.shortname, value: this.state.space.shortname }}
        avatar={this.state.space.avatar}
        shortnamePrefix={this.props.shortnamePrefix}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onAvatarChange={this.handleAvatarEdit}
        onAvatarRemove={this.handleAvatarRemove}
      />
    );
  }

  renderAvatarEdit() {
    if (!this.state.space.avatar || typeof this.state.space.avatar === 'string') {
      return null;
    }

    return (
      <ImageEdit
        image={this.state.space.avatar}
        type="circle"
        size={250}
        height={400}
        onSubmit={this.handleAvatarChange}
      />
    );
  }


  renderBody() {
    switch (this.state.screen) {
      case 'info':
        return (
          <ModalBody className={styles.body}>
            {this.renderForm()}
          </ModalBody>
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
            disabled={!this.isChanged() || this.isPending()}
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
