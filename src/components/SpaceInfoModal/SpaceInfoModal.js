/**
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import styles from './SpaceInfoModal.css';

export type Props = {
  className?: string,
  children?: mixed
};

class SpaceInfoModal extends PureComponent {
  props: Props;

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        {this.props.children}
      </div>
    );
  }
}

export default SpaceInfoModal;
