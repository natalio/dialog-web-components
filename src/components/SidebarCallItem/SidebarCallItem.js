/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { CallInfo } from '@dlghq/dialog-types';
import type { ProviderContext } from '@dlghq/react-l10n';
import React, { PureComponent } from 'react';
import { LocalizationContextType } from '@dlghq/react-l10n';
import { formatTime } from '@dlghq/dialog-utils';
import classNames from 'classnames';
import PeerAvatarDouble from '../PeerAvatarDouble/PeerAvatarDouble';
import Icon from '../Icon/Icon';
import formatRelative from '../../utils/formatRelative';
import styles from './SidebarCallItem.css';

export type CallState = 'outgoing' | 'incoming' | 'canceled' | 'missed';

export type Props = {
  className?: string,
  call: CallInfo,
  uid: number,
  onSelect: (call: CallInfo) => mixed,
};

type Context = ProviderContext;

class SidebarCallItem extends PureComponent<Props> {
  context: Context;

  static contextTypes = {
    l10n: LocalizationContextType,
  };

  handleClick = (): void => {
    this.props.onSelect(this.props.call);
  };

  getCallState = (): CallState => {
    const {
      uid,
      call: { initiator, isAnswered },
    } = this.props;

    let state = '';

    if (uid === initiator.peer.id) {
      state = 'outgoing';
    } else {
      state = 'incoming';
    }

    if (!isAnswered) {
      if (state === 'outgoing') {
        state = 'canceled';
      } else {
        state = 'missed';
      }
    }

    return state;
  };

  getTitle = (): string => {
    const {
      call: { recipient, initiator },
    } = this.props;
    const state = this.getCallState();

    if (state === 'incoming' || state === 'missed') {
      return initiator.title;
    }

    return recipient.title;
  };

  renderAvatar() {
    return (
      <PeerAvatarDouble
        className={styles.avatar}
        size={36}
        big={this.props.call.initiator}
        small={this.props.call.recipient}
      />
    );
  }

  renderTitle() {
    const state = this.getCallState();
    const title = this.getTitle();
    const iconClassName = classNames(styles.icon, {
      [styles.iconDanger]: state === 'missed' || state === 'canceled',
    });

    return (
      <div className={styles.title}>
        <Icon glyph={`call_${state}`} size={18} className={iconClassName} />
        <span>{title}</span>
      </div>
    );
  }

  renderTime() {
    const {
      call: { date },
    } = this.props;
    const locale = this.context.l10n.locale;
    const time = formatRelative(date, new Date(), { locale });

    return <time className={styles.time}>{time}</time>;
  }

  renderDuration() {
    const {
      call: { duration, isAnswered },
    } = this.props;

    if (!isAnswered) {
      return null;
    }

    const humanReadableDuration = formatTime(Math.floor(duration / 1000));

    return <time className={styles.duration}>{humanReadableDuration}</time>;
  }

  renderContent() {
    return (
      <div className={styles.content}>
        {this.renderTitle()}
        {this.renderTime()}
      </div>
    );
  }

  render() {
    const className = classNames(styles.container, this.props.className);

    return (
      <div
        className={className}
        onClick={this.handleClick}
        id={`sidebar_call_item_${this.props.call.id}`}
      >
        {this.renderAvatar()}
        {this.renderContent()}
        {this.renderDuration()}
      </div>
    );
  }
}

export default SidebarCallItem;
