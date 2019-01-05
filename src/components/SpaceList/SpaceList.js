/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';
import React, { PureComponent } from 'react';
import classNames from 'classnames';

import SpaceAvatar from './SpaceAvatar/SpaceAvatar.js';
import styles from './SpaceList.css';

export type Props = {
  className?: string,
  current: string,
  width?: number,
  height?: number,
  size: number,
  variants: Array<{
    id: string,
    title: string,
    image?: string,
    placeholder?: AvatarPlaceholder,
    className?: string,
  }>,
  onPick: (current: string) => mixed,
};

class SpaceList extends PureComponent<Props> {
  static defaultProps = {
    size: 40,
    width: 246,
    height: 60,
  };

  render() {
    const { current, variants, size, width, height } = this.props;
    const className = classNames(styles.container, this.props.className);

    const spaceAvatars = variants.map((variant) => {
      const { id, title, image, placeholder } = variant;
      const active = id === current;

      return (
        <SpaceAvatar
          id={id}
          key={id}
          title={title}
          active={active}
          image={image}
          placeholder={placeholder}
          size={size}
          onPick={this.props.onPick}
        />
      );
    });

    return (
      <div
        className={className}
        style={{
          maxHeight: height,
          height,
          width,
        }}
      >
        <div className={styles.wrapper}>{spaceAvatars}</div>
      </div>
    );
  }
}

export default SpaceList;
