/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { LocalizationContextType } from '@dlghq/react-l10n';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import styles from './CreateSpaceModal.css';
import Switcher from '../Switcher/Switcher';

export type Props = {
  id: string,
  title: string,
  shortname: string,
  shortnamePrefix: ?string,
  avatar: ?string,
  aboutMaxLength?: number,
  about: string,
  className?: string,
  isPublicSpaceEnabled: ?boolean,
  vertical: boolean,
  onSubmit: () => void,
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
  onAvatarRemove: () => void,
  onAvatarChange: (avatar: File) => void,
};

export type Context = ProviderContext;

export type State = {
  isPublic: boolean,
};

class CreateSpaceInfoForm extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType,
  };

  static defaultProps = {
    aboutMaxLength: 3000,
    vertical: false,
  };

  constructor() {
    super();

    this.state = {
      isPublic: false,
    };
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit();
  };

  handlePublicToggle = (isPublic: boolean): void => {
    this.setState({ isPublic });
  };

  renderAvatar() {
    const { title, avatar } = this.props;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={title}
          placeholder="empty"
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname() {
    const { isPublicSpaceEnabled, shortname, id } = this.props;
    const { isPublic } = this.state;

    if (!isPublicSpaceEnabled) {
      return null;
    }

    return (
      <div>
        <Switcher
          id={`${id}_public_swither`}
          name={`${id}_public_swither`}
          value={isPublic}
          onChange={this.handlePublicToggle}
          label="CreateSpaceModal.public"
          className={styles.switcher}
        />
        <InputNext
          id={`${id}_shortname`}
          name="shortname"
          value={shortname}
          prefix={this.props.shortnamePrefix}
          disabled={!isPublic}
          label="CreateSpaceModal.info.shortname.label"
          placeholder="CreateSpaceModal.info.shortname.placeholder"
          onChange={this.props.onChange}
        />
      </div>
    );
  }

  render() {
    const { id, title, vertical, about, aboutMaxLength } = this.props;
    const { l10n } = this.context;
    const className = classNames(
      styles.info,
      {
        [styles.vertical]: vertical,
      },
      this.props.className,
    );

    return (
      <div className={className}>
        {this.renderAvatar()}
        <form
          id={id}
          autoComplete="off"
          className={styles.form}
          onSubmit={this.handleSubmit}
        >
          <InputNext
            className={styles.input}
            id={`${id}_title`}
            name="title"
            placeholder={l10n.formatText(
              'CreateSpaceModal.info.title.placeholder',
            )}
            label={l10n.formatText('CreateSpaceModal.info.title.label')}
            value={title}
            htmlAutoFocus
            onChange={this.props.onChange}
          />
          <InputNext
            className={styles.input}
            id={`${id}_about`}
            name="about"
            onChange={this.props.onChange}
            label={l10n.formatText(`CreateSpaceModal.info.description.label`)}
            placeholder={l10n.formatText(
              `CreateSpaceModal.info.description.placeholder`,
            )}
            type="textarea"
            value={about}
            maxLength={aboutMaxLength}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default CreateSpaceInfoForm;
