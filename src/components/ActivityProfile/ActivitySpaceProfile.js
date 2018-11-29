/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Space } from '../SpaceInfoModal/types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Avatar from '../Avatar/Avatar';
import PeerInfoTitle from '../PeerInfoTitle/PeerInfoTitle';
import styles from './ActivityProfile.css';

export type Props = {
  className?: string,
  info: Space
};

class ActivityGroupProfile extends PureComponent<Props> {
  renderAvatar() {
    const { info: { name, bigAvatar, placeholder } } = this.props;

    return (
      <Avatar
        className={styles.avatar}
        size={140}
        title={name}
        image={bigAvatar}
        placeholder={placeholder}
      />
    );
  }

  renderTitle() {
    const { info: { name, shortname } } = this.props;

    return (
      <PeerInfoTitle
        title={name}
        userName={shortname}
        titleClassName={styles.name}
        userNameClassName={styles.nick}
        emojiSize={24}
      />
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <div className={styles.header}>
          {this.renderAvatar()}
          {this.renderTitle()}
        </div>
      </div>
    );
  }
}

export default ActivityGroupProfile;
