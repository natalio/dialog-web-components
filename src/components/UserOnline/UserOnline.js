/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import {
  Text,
  LocalizationContextType,
  type ProviderContext,
} from '@dlghq/react-l10n';
import classNames from 'classnames';
import { getUserLastSeen } from '../../utils/getUserLastSeen';
import styles from './UserOnline.css';

export type UserOnlineState = {
  online: boolean,
  updateDate: Date,
  lastSeen: ?Date,
};

export type Props = {
  className?: string,
  online: ?UserOnlineState,
};

export function UserOnline(props: Props, context: ProviderContext) {
  const { online } = props;
  const classes = classNames(styles.container, props.className);

  if (!online) {
    return <Text className={classes} id="UserOnline.offline" />;
  }

  if (online.online) {
    return <Text className={classes} id="UserOnline.online" />;
  }

  return (
    <span className={classes}>
      {getUserLastSeen(online, context.l10n.locale)}
    </span>
  );
}

UserOnline.contextTypes = {
  l10n: LocalizationContextType,
};
