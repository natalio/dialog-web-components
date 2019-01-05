/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import type { Field } from '@dlghq/dialog-types';
import type { Space, SpaceFields } from './types';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import Switcher from '../Switcher/Switcher';
import styles from '../CreateNewModal/CreateNewModal.css';

type InputTarget = {
  target: {
    name: SpaceFields,
  },
};

export type Props = {
  space: Space,
  name: Field<string>,
  shortname: Field<?string>,
  avatar: ?string,
  about: Field<?string>,
  aboutMaxLength?: number,
  isPublic: boolean,
  isPublicSpaceEnabled: boolean,
  shortnamePrefix?: ?string,
  onChange: (value: mixed, field: SpaceFields) => void,
  onSubmit: () => void,
  onAvatarChange: (avatar: File) => void,
  onAvatarRemove: () => void,
  onIsPublicChange: (isPublic: boolean) => void,
};

export type State = {
  avatar: ?File,
};

export type Context = ProviderContext;

class EditSpaceModalForm extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType,
  };

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit();
  };

  handleChange = (value: mixed, { target }: InputTarget) => {
    this.props.onChange(value, target.name);
  };

  getInputState = (field: SpaceFields): Object => {
    if (this.props[field].error) {
      return {
        status: 'error',
        hint: this.props[field].error,
      };
    }

    return {};
  };

  renderAvatar() {
    const { space, name, avatar } = this.props;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          title={name.value}
          placeholder={space.placeholder}
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  renderShortname() {
    const { isPublicSpaceEnabled, shortname, isPublic } = this.props;

    if (!isPublicSpaceEnabled) {
      return null;
    }

    return (
      <div>
        <Switcher
          id="edit_space_form_public_swither"
          name="edit_space_form_public_swither"
          value={isPublic}
          onChange={this.props.onIsPublicChange}
          label="EditSpaceModal.form.public"
          className={styles.switcher}
        />
        <InputNext
          id="edit_space_form_shortname"
          name="shortname"
          onChange={this.handleChange}
          disabled={!isPublic}
          prefix={this.props.shortnamePrefix}
          value={shortname.value}
          label="EditSpaceModal.form.shortname"
          {...this.getInputState('shortname')}
        />
      </div>
    );
  }

  render() {
    const { name, about, aboutMaxLength } = this.props;

    return (
      <div className={styles.info}>
        {this.renderAvatar()}
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <InputNext
            className={styles.input}
            id="edit_space_form_name"
            name="name"
            onChange={this.handleChange}
            status={name.error ? 'error' : 'normal'}
            label="EditSpaceModal.form.name.label"
            placeholder="EditSpaceModal.form.name.placeholder"
            value={name.value}
            htmlAutoFocus
            {...this.getInputState('name')}
          />
          <InputNext
            className={styles.input}
            id="edit_space_form_about"
            name="about"
            status={about.error ? 'error' : 'normal'}
            onChange={this.handleChange}
            maxLength={aboutMaxLength}
            label="EditSpaceModal.form.description.label"
            placeholder="EditSpaceModal.form.description.placeholder"
            type="textarea"
            value={about.value}
            {...this.getInputState('about')}
          />
          {this.renderShortname()}
        </form>
      </div>
    );
  }
}

export default EditSpaceModalForm;
