/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import classNames from 'classnames';
import styles from './Tabs.css';

export type Props<T> = {
  id: T,
  title: string,
  active: boolean,
  onPick: (id: T) => mixed,
};

class Tab<T: string> extends PureComponent<Props<T>> {
  handleClick = (): void => {
    this.props.onPick(this.props.id);
  };

  render() {
    const { title, active, id } = this.props;
    const className = classNames(styles.tab, {
      [styles.active]: active,
    });

    return (
      <li
        className={className}
        onClick={this.handleClick}
        id={`tabs_tab_${id}`}
      >
        <Text id={title} />
      </li>
    );
  }
}

export default Tab;
