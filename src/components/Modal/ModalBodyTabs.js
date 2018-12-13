/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import Tabs, { type TabVariant } from '../Tabs/Tabs';
import ModalBody from './ModalBody';
import styles from './Modal.css';

export type Props<T> = {
  className?: string,
  children: Node,
  tabs: Array<TabVariant<T>>,
  current: T,
  onChange: (screen: T) => mixed,
};

class ModalBodyTabs<T: string> extends PureComponent<Props<T>> {
  renderTabs(): Node {
    const { tabs, current } = this.props;

    if (tabs.length === 0) {
      return null;
    }

    return (
      <Tabs
        className={styles.tabs}
        current={current}
        variants={tabs}
        onPick={this.props.onChange}
      />
    );
  }

  render() {
    return (
      <div className={styles.bodyWapper}>
        {this.renderTabs()}
        <ModalBody className={this.props.className}>
          {this.props.children}
        </ModalBody>
      </div>
    );
  }
}

export default ModalBodyTabs;
