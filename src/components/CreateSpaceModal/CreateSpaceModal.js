/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { Props, State, Step } from './types';
import type { SelectorState } from '../../entities';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import Modal from '../Modal/Modal';
import ModalHeader from '../Modal/ModalHeader';
import ModalClose from '../Modal/ModalClose';
import ModalBody from '../Modal/ModalBody';
import ModalFooter from '../Modal/ModalFooter';
import Icon from '../Icon/Icon';
import Button from '../Button/Button';
import CreateSpaceInfoForm from './CreateSpaceInfoForm';
import CreateGroupMembersForm from '../CreateNewModal/CreateGroupMembersForm';
import ImageEdit from '../ImageEdit/ImageEdit';
import styles from './CreateSpaceModal.css';
import HotKeys from '../HotKeys/HotKeys';

class CreateSpaceModal extends PureComponent<Props, State> {
  static defaultProps = {
    id: 'create_space_modal',
    isPublicSpaceEnabled: false,
  };

  constructor() {
    super();

    this.state = {
      step: 'info',
      avatar: null,
    };
  }

  handlePrevStepClick = (): void => {
    this.setState({
      step: 'info',
    });
  };

  handleNextStepClick = (): void => {
    this.setState({
      step: 'members',
    });
  };

  handleStepChange = (step: Step): void => {
    this.setState({ step });
  };

  handleChange = (value: string, { target }: SyntheticInputEvent<>) => {
    this.props.onRequestChange({
      ...this.props.request,
      [target.name]: value,
    });
  };

  handleMembersChange = (members: SelectorState<PeerInfo>): void => {
    this.props.onRequestChange({
      ...this.props.request,
      members,
    });
  };

  handleAvatarChange = (avatar: File): void => {
    fileToBase64(avatar, (newAvatar) => {
      this.props.onRequestChange({
        ...this.props.request,
        avatar: newAvatar,
      });
      this.handleStepChange('info');
    });
  };

  handleAvatarRemove = (): void => {
    this.props.onRequestChange({
      ...this.props.request,
      avatar: null,
    });
  };

  handleAvatarEdit = (avatar: File): void => {
    this.setState({
      avatar,
    });

    this.handleStepChange('avatar');
  };

  handleSubmit = (event: ?SyntheticEvent<>): void => {
    if (event) {
      event.preventDefault();
    }
    this.props.onSubmit();
  };

  handleCancelAvatarEdit = (): void => {
    this.handleStepChange('info');
  };

  handleHotkey = (hotkey: string, event: KeyboardEvent): void => {
    if (hotkey === 'Enter') {
      event.preventDefault();
      event.stopPropagation();

      switch (this.state.step) {
        case 'avatar':
          // do nothing because ImageEdit has own HotKeys handlers
          break;
        case 'members':
          this.handleSubmit();
          break;
        default:
          this.handleNextStepClick();
      }
    }
  };

  renderError() {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    return <div className={styles.error}>{error}</div>;
  }

  renderInfoStep() {
    const {
      id,
      request: { title, shortname, avatar, about },
      shortnamePrefix,
      isPublicSpaceEnabled,
    } = this.props;

    const { step } = this.state;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Text id="CreateSpaceModal.title" />
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${this.props.id}_close_button`}
          />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <CreateSpaceInfoForm
            vertical
            id={id}
            title={title}
            avatar={avatar}
            shortname={shortname}
            about={about}
            isPublicSpaceEnabled={isPublicSpaceEnabled}
            shortnamePrefix={shortnamePrefix}
            onChange={this.handleChange}
            onSubmit={this.handleNextStepClick}
            onAvatarRemove={this.handleAvatarRemove}
            onAvatarChange={this.handleAvatarEdit}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            wide
            id={`${id}_step_${step}_submit_button`}
            type="submit"
            theme="success"
            rounded={false}
            onClick={this.handleNextStepClick}
          >
            <Text id={`CreateSpaceModal.next.${step}`} />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderAvatarStep() {
    const { avatar } = this.state;

    if (!avatar) {
      return null;
    }

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handleCancelAvatarEdit}
            className={styles.back}
            id={`${this.props.id}_back_button`}
          />
          <Text id="CreateSpaceModal.avatar_edit" />
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${this.props.id}_close_button`}
          />
        </ModalHeader>
        {this.renderError()}
        <ModalBody className={styles.body}>
          <ImageEdit
            image={avatar}
            type="circle"
            size={250}
            height={400}
            onSubmit={this.handleAvatarChange}
          />
        </ModalBody>
      </div>
    );
  }

  renderMembersStep() {
    const {
      id,
      request: { members },
    } = this.props;

    return (
      <div className={styles.wrapper}>
        <ModalHeader className={styles.header} withBorder>
          <Icon
            glyph="arrow_back"
            onClick={this.handlePrevStepClick}
            className={styles.back}
            id={`${id}_back_button`}
          />
          <Text id="CreateSpaceModal.title" />
          <ModalClose
            pending={this.props.pending}
            onClick={this.props.onClose}
            id={`${id}_close_button`}
          />
        </ModalHeader>
        <ModalBody className={styles.body}>
          <CreateGroupMembersForm
            id={id}
            members={members}
            autoFocus={this.props.autoFocus}
            onChange={this.handleMembersChange}
            onSubmit={this.handleSubmit}
          />
        </ModalBody>
        <ModalFooter className={styles.footer}>
          <Button
            className={styles.halfButton}
            onClick={this.handleSubmit}
            rounded={false}
            form={id}
            type="submit"
            theme="success"
            loading={this.props.pending}
            disabled={this.props.pending}
            id={`${id}_finish_button`}
            wide
          >
            <Text id="CreateSpaceModal.finish" />
          </Button>
        </ModalFooter>
      </div>
    );
  }

  renderStep() {
    const { step } = this.state;

    switch (step) {
      case 'info':
        return this.renderInfoStep();
      case 'avatar':
        return this.renderAvatarStep();
      case 'members':
        return this.renderMembersStep();
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

export default CreateSpaceModal;
