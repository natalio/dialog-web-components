/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import type { Field } from '@dlghq/dialog-types';
import type { Space, SpaceFields } from './types';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import styles from '../CreateNewModal/CreateNewModal.css';

type InputTarget = {
  target: {
    name: SpaceFields
  }
}

export type Props = {
  space: Space,
  name: Field<string>,
  shortname: Field<?string>,
  avatar: ?string,
  shortnamePrefix?: ?string,
  onChange: (value: mixed, field: SpaceFields) => void,
  onSubmit: () => void,
  onAvatarChange: (avatar: File) => void,
  onAvatarRemove: () => void
};

export type State = {
  avatar: ?File
};

export type Context = ProviderContext;

class EditSpaceModalForm extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType
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
        hint: this.props[field].error
      };
    }

    return {};
  };

  renderAvatar() {
    const { space, name, avatar } = this.props;

    return (
      <div className={styles.avatarBlock}>
        <AvatarSelector
          name={name.value}
          placeholder={space.placeholder}
          avatar={avatar}
          size={140}
          onRemove={this.props.onAvatarRemove}
          onChange={this.props.onAvatarChange}
        />
      </div>
    );
  }

  render() {
    const { shortname, name } = this.props;

    return (
      <div className={styles.info}>
        {this.renderAvatar()}
        <form className={styles.form} autoComplete="off" onSubmit={this.handleSubmit}>
          <InputNext
            className={styles.input}
            id="edit_space_form_name"
            name="name"
            onChange={this.handleChange}
            status={name.error ? 'error' : 'normal'}
            label="EditSpaceModal.form.label"
            placeholder="EditSpaceModal.form.placeholder"
            value={name.value}
            htmlAutoFocus
            {...this.getInputState('name')}
          />
          <InputNext
            id="edit_space_form_shortname"
            name="shortname"
            onChange={this.handleChange}
            prefix={this.props.shortnamePrefix}
            value={shortname.value}
            label="EditSpaceModal.form.shortname"
            {...this.getInputState('shortname')}
          />
        </form>
      </div>
    );
  }
}

export default EditSpaceModalForm;
