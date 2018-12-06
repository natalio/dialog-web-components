/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import Tabs from '../Tabs/Tabs';
import ModalBody from './ModalBody';
import styles from './Modal.css';

type Tab = {
  id: string,
  title: string,
};

export type Props = {
  className?: string,
  children: ({ current: string | null }) => Node,
  tabs: Array<Tab>,
};

export type State = {
  current: string | null,
};

class ModalBodyTabs extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      current: props.tabs && props.tabs.length ? props.tabs[0].id : null,
    };
  }

  handleTabChange = (current: string): void => {
    this.setState({ current });
  };

  renderTabs(): Node {
    const { tabs } = this.props;
    const { current } = this.state;

    if (!tabs || (tabs && !tabs.length)) {
      return null;
    }

    return (
      <Tabs
        className={styles.tabs}
        current={current}
        variants={tabs}
        onPick={this.handleTabChange}
      />
    );
  }

  render() {
    const { current } = this.state;
    const className = classNames(styles.bodyWapper, this.props.className);

    return (
      <div className={className}>
        {this.renderTabs()}
        <ModalBody className={styles.currentTab}>
          {this.props.children({ current })}
        </ModalBody>
      </div>
    );
  }
}

export default ModalBodyTabs;
