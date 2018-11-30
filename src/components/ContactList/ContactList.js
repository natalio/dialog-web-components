/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { PeerInfo } from '@dlghq/dialog-types';
import type { SelectorState } from '../../entities';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import SelectList from '../SelectList/SelectList';
import ContactListItem from './ContactListItem';
import styles from './ContactList.css';

export type Props = {
  className?: string,
  width: number,
  itemHeight: number,
  itemVisibleCount: number,
  selector: SelectorState<PeerInfo>,
  onChange: (selector: SelectorState<PeerInfo>) => mixed,
  renderEmpty?: () => Node,
};

function ContactList(props: Props) {
  const className = classNames(styles.container, this.props.className);

  return (
    <div className={styles.list}>
      <SelectList
        className={className}
        width={this.props.width}
        itemHeight={this.props.itemHeight}
        itemVisibleCount={this.props.itemVisibleCount}
        selector={this.props.selector}
        onChange={this.props.onChange}
        renderItem={ContactListItem.render}
        renderEmpty={this.props.renderEmpty}
      />
    </div>
  );
}

ContactList.defaultProps = {
  width: 500,
  itemHeight: 60,
  itemVisibleCount: 7.5,
};

export default ContactList;
