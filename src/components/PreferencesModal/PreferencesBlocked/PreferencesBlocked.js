/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User } from '@dlghq/dialog-types';
import React, { PureComponent, type Node } from 'react';
import { Text, LocalizationContextType } from '@dlghq/react-l10n';
import { filterByQuery } from '@dlghq/dialog-utils';
import Fieldset from '../../Fieldset/Fieldset';
import SearchInput from './SearchInput';
import BlockedUser from './BlockedUser';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Blocked.css';

export type Props = {
  blocked: Array<User>,
  onUnblockUser: (id: number) => mixed,
};

export type State = {
  query: string,
};

class PreferencesBlocked extends PureComponent<Props, State> {
  static contextTypes = {
    l10n: LocalizationContextType,
  };

  state = {
    query: '',
  };

  handleQueryChange = (query: string): void => {
    this.setState({ query });
  };

  renderSearchInput() {
    const { blocked } = this.props;
    const { l10n } = this.context;

    if (!blocked.length) {
      return null;
    }

    return (
      <SearchInput
        onChange={this.handleQueryChange}
        placeholder={l10n.formatText(
          'PreferencesModal.blocked.search_placeholder',
        )}
      />
    );
  }

  renderBlockedUsers(): Node {
    const { blocked } = this.props;
    const { query } = this.state;

    if (!blocked.length) {
      return [
        <Text
          key="empty"
          id="PreferencesModal.blocked.empty"
          className={styles.empty}
          tagName="div"
        />,
      ];
    }

    const filtered = filterByQuery(query, blocked, (user) => user.name);

    if (!filtered.length) {
      return [
        <Text
          key="not_found"
          id="PreferencesModal.blocked.not_found"
          className={styles.notFound}
          tagName="div"
        />,
      ];
    }

    return filtered.map((user) => {
      return (
        <BlockedUser
          key={user.id}
          user={user}
          onUnblockUser={this.props.onUnblockUser}
        />
      );
    });
  }

  render() {
    return (
      <div className={preferencesStyles.screen}>
        <Fieldset legend="PreferencesModal.blocked.legend">
          {this.renderSearchInput()}
          {this.renderBlockedUsers()}
        </Fieldset>
      </div>
    );
  }
}

export default PreferencesBlocked;
