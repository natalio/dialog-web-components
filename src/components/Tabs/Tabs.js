/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Tab from './Tab';
import styles from './Tabs.css';

export type TabVariant<T> = {
  id: T,
  title: string,
};

type Props<T> = {
  variants: Array<TabVariant<T>>,
  current: T,
  className?: string,
  onPick: (current: T) => mixed,
};

class Tabs<T> extends PureComponent<Props<T>> {
  render() {
    const { current, variants } = this.props;
    const className = classNames(styles.container, this.props.className);

    const tabs = variants.map(({ id, title }) => {
      const active = id === current;

      return (
        <Tab
          id={id}
          key={String(id)}
          title={title}
          active={active}
          onPick={this.props.onPick}
        />
      );
    });

    return <ul className={className}>{tabs}</ul>;
  }
}

export default Tabs;
