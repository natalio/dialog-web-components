/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import styles from './FakeSpaceList.css';

export type Props = {
  selected?: boolean,
  size: number,
};

class FakeSpaceAvatar extends PureComponent<Props> {
  svgShape() {
    const { selected } = this.props;

    if (selected) {
      // rhombus shape
      return (
        'M 20.5 20.5  A 0 0 0 0 1 20.5 20.5 ' +
        'L 37 4.5     A 21.5 21.5 0 0 1 63 4.5   L 79.5 20.5  A 0 0 0 0 1 79.5 20.5 ' +
        'L 95.5 37    A 21.5 21.5 0 0 1 95.5 63  L 79.5 79.5  A 0 0 0 0 1 79.5 79.5 ' +
        'L 63 95.5    A 21.5 21.5 0 0 1 37 95.5  L 20.5 79.5  A 0 0 0 0 1 20.5 79.5 ' +
        'L 4.5 63     A 21.5 21.5 0 0 1 4.5 37   L 20.5 20.5  Z'
      );
    }

    // square shape
    return (
      'M 50 15    A 0 0 0 0 1 50 15 ' +
      'L 67.5 15  A 17 17 0 0 1 85 32.5  L 85 50  A 0 0 0 0 1 85 50 ' +
      'L 85 67.5  A 17 17 0 0 1 67.5 85  L 50 85  A 0 0 0 0 1 50 85 ' +
      'L 32.5 85  A 17 17 0 0 1 15 67.5  L 15 50  A 0 0 0 0 1 15 50 ' +
      'L 15 32.5  A 17 17 0 0 1 32.5 15  L 50 15  Z'
    );
  }

  render() {
    const { size } = this.props;

    return (
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        shapeRendering="auto"
      >
        <g>
          <path className={styles.avatar} x="50%" y="50%" d={this.svgShape()} />
        </g>
      </svg>
    );
  }
}

export default FakeSpaceAvatar;
