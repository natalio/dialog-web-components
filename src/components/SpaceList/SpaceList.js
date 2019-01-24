/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Text from '@dlghq/react-l10n/src/Text';

import type { Space } from './types';
import Trigger from '../Trigger/Trigger';
import Dropdown from '../Dropdown/Dropdown';
import DropdownItem from '../Dropdown/DropdownItem';
import Icon from '../Icon/Icon';
import SpaceAvatar from './SpaceAvatar/SpaceAvatar.js';
import styles from './SpaceList.css';

type variants = {
  text: string,
  handleClick: () => mixed,
};

export type Props = {
  className?: string,
  width?: number,
  height: number,
  size: number,
  items: Array<Space>,
  selected: Space,
  unreaded: Array<string>,
  onPick: (current: Space) => mixed,
  spaceActions: Array<variants>,
  icon?: string,
};

class SpaceList extends PureComponent<Props> {
  static defaultProps = {
    size: 40,
    width: 246,
    height: 40,
    icon: 'plus_outline',
  };

  renderTrigger = (handlers: Object, isActive: boolean) => {
    const plusClassName = classNames(
      styles.plus,
      {
        [styles.plusActive]: isActive,
      },
      this.props.className,
    );

    return (
      <Icon
        className={plusClassName}
        glyph={this.props.icon}
        size={28}
        {...handlers}
      />
    );
  };

  renderDropdown = () => {
    return (
      <Dropdown>
        {this.props.spaceActions.map((spaceAction) => {
          return (
            <DropdownItem
              key={spaceAction.text}
              onClick={spaceAction.handleClick}
              id={`sidebar_header_${spaceAction.text}`}
            >
              <Text id={spaceAction.text} />
            </DropdownItem>
          );
        })}
      </Dropdown>
    );
  };

  renderSpaceName = () => {
    const options = {
      attachment: 'top center',
      targetAttachment: 'bottom center',
      constraints: [
        {
          to: 'scrollParent',
          attachment: 'together',
          pin: true,
        },
      ],
      targetOffset: '0 0',
    };

    if (!this.props.selected) {
      return null;
    }

    const { width, height } = this.props;

    return (
      <div
        style={{
          width,
          maxWidth: width,
          height,
        }}
        className={styles.spaceNameWrapper}
      >
        <span className={styles.spaceName}>{this.props.selected.title}</span>
        <Trigger
          options={options}
          renderTrigger={this.renderTrigger}
          renderChild={this.renderDropdown}
          openHandler={['onClick']}
          closeHandler={['onClick']}
          closeOnDocumentClick
          closeOnDocumentScroll
        />
      </div>
    );
  };

  render() {
    const { selected, items, size, width, height, unreaded } = this.props;
    const className = classNames(styles.container, this.props.className);

    const spaceAvatars = items.map((item) => {
      const { id } = item;
      const active = selected && selected.id === id;

      const unreadedProp = unreaded.some((spaceId) => {
        return spaceId === item.id;
      });

      return (
        <SpaceAvatar
          space={item}
          key={id}
          active={active}
          size={size}
          unreaded={unreadedProp}
          onPick={this.props.onPick}
        />
      );
    });

    return (
      <div>
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

        <div style={{ width }}>{this.renderSpaceName()}</div>
      </div>
    );
  }
}

export default SpaceList;
