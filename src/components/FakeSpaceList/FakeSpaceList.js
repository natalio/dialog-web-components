/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { random } from 'lodash';
import styles from './FakeSpaceList.css';
import FakeSpaceAvatar from './FakeSpaceAvatar';

export type Props = {
  className?: string,
  selected: boolean,
  size: number,
  width: number,
  height: number,
};

class FakeSpaceList extends PureComponent<Props> {
  static defaultProps = {
    size: 40,
    width: 246,
    height: 60,
  };

  renderSpaces() {
    // it's look ok, when there is between 3 or 5 fake spaces in row
    const spaceLength = random(2, 4);
    const spaceArray = [];

    for (let i = 0; i <= spaceLength; i++) {
      spaceArray.push(<FakeSpaceAvatar key={i} size={this.props.size} />);
    }

    if (!this.props.selected) {
      return spaceArray;
    }

    const selectedPlace = random(0, spaceLength - 1);
    spaceArray[selectedPlace] = (
      <FakeSpaceAvatar key={selectedPlace} size={this.props.size} selected />
    );

    return spaceArray;
  }

  renderSpaceName() {
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
        <div className={styles.spaceName}>
          <div className={styles.spaceNameInner} />
        </div>
        <div className={styles.spaceActionsIcon} />
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);
    const { width, height } = this.props;

    return (
      <div
        className={className}
        style={{
          maxHeight: height,
          height,
          width,
        }}
      >
        {this.renderSpaces()}
        {this.renderSpaceName()}
      </div>
    );
  }
}

export default FakeSpaceList;
