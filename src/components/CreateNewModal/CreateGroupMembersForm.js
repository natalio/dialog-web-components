/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';
import React from 'react';
import ContactSelector from '../ContactSelector/ContactSelector';
import styles from './CreateNewModal.css';

export type Props = {
  members: SelectorState<PeerInfo>,
  autoFocus: boolean,
  onChange: (members: SelectorState<PeerInfo>) => mixed,
};

function CreateGroupMembersForm(props: Props) {
  return (
    <div className={styles.members}>
      <ContactSelector
        autoFocus={props.autoFocus}
        selector={props.members}
        onChange={props.onChange}
      />
    </div>
  );
}

export default CreateGroupMembersForm;
