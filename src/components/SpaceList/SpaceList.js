/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import SpaceAvatar from './SpaceAvatar.js';
import SpaceAdd from './SpaceAdd';
import styles from './SpaceList.css';

export type Props = {
  className?: string,
  current: string,
  variants: Array<{
    id: string,
    title: string,
    image?: string,
    size?: string,
    placeholder?:AvatarPlaceholder,
    className?: string
  }>,
  onPick: (current: string) => mixed,
  onClick: (event: SyntheticMouseEvent<>) => mixed
};

class SpaceList extends PureComponent<Props> {
  static defaultProps = {
    size: 40
  };

  handleSpaceAddClick = () => {
    this.props.onClick();
  };

  render() {
    const { current, variants, size } = this.props;
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
      <div className={className} style={{ height: size }}>
        <div className={styles.wrapper}>
          {spaceAvatars}
        </div>

        <SpaceAdd size={size} onClick={this.handleSpaceAddClick} />
      </div>
    );
  }
}

export default SpaceList;
