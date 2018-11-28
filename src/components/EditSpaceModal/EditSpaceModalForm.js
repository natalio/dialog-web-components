/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { ProviderContext } from '@dlghq/react-l10n';
import type { Field } from '@dlghq/dialog-types';
import type { Space } from './types';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { fileToBase64 } from '@dlghq/dialog-utils';
import AvatarSelector from '../AvatarSelector/AvatarSelector';
import InputNext from '../InputNext/InputNext';
import styles from '../CreateNewModal/CreateNewModal.css';

export type Props = {
  space: Space,
  name: Field<string>,
  shortname: Field<?string>,
  avatar: File,
  shortnamePrefix?: ?string,
  onChange: () => void,
  onSubmit: () => void,
  onAvatarChange: (avatar: File) => void,
  onAvatarRemove: () => void
};

export type State = {
  avatar: ?(string | File)
};

export type Context = ProviderContext;

class EditSpaceModalForm extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType
  };

  constructor(props: Props, context: Context) {
    super(props, context);

    this.state = {
      avatar: props.avatar
    };

    if (props.avatar) {
      fileToBase64(props.avatar, (avatar) => {
        this.setState({ avatar });
      });
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.avatar !== this.props.avatar && this.props.avatar) {
      fileToBase64(this.props.avatar, (avatar) => this.setState({ avatar }));
    }
  }

  handleSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();

    this.props.onSubmit();
  };

  getInputState = (field: string): Object => {
    if (this.props[field].error) {
      return {
        status: 'error',
        hint: this.props[field].error
      };
    }

    return {};
  };

  renderAvatar() {
    const { space, name } = this.props;
    const { avatar } = this.state;

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
            onChange={this.props.onChange}
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
            onChange={this.props.onChange}
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
