/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AuthSession } from '@dlghq/dialog-types';
import type { Field as FieldType } from '@dlghq/dialog-utils';
import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Fieldset from '../../Fieldset/Fieldset';
import Field from '../../Field/Field';
import Button from '../../Button/Button';
import Session from './SecuritySession';
import Spinner from '../../Spinner/Spinner';
import preferencesStyles from '../PreferencesModal.css';
import styles from './Security.css';

export type Props = {
  sessions: FieldType<?Array<AuthSession>>,
  onSessionsLoad: () => mixed,
  onSessionTerminate: (id: number) => mixed,
  onAllSessionsTerminate: () => mixed,
};

class PreferencesSecurity extends PureComponent<Props> {
  componentDidMount(): void {
    this.props.onSessionsLoad();
  }

  renderCurrentSessions() {
    const { sessions } = this.props;

    if (!sessions.value) {
      return null;
    }

    const current = sessions.value.find(
      (session) => session.holder === 'THIS_DEVICE',
    );

    return (
      <Fieldset legend="PreferencesModal.security.legend.current_session">
        {current && <Session session={current} />}
        {this.renderTerminateAllSessions()}
      </Fieldset>
    );
  }

  renderTerminateAllSessions() {
    const { sessions } = this.props;

    if (!sessions.value) {
      return null;
    }

    if (sessions.value.length === 1) {
      return null;
    }

    return (
      <Field>
        <Button
          theme="danger"
          view="link"
          size="small"
          id="preferences_security_terminate_all_button"
          className={styles.termnateAllButton}
          onClick={this.props.onAllSessionsTerminate}
        >
          <Text id="PreferencesModal.security.terminate_all" />
        </Button>
      </Field>
    );
  }

  renderActiveSessions() {
    const { sessions } = this.props;

    if (!sessions.value) {
      return null;
    }

    const activeSessions = sessions.value.filter(
      (session) => session.holder === 'OTHER_DEVICE',
    );

    if (!activeSessions.length) {
      return null;
    }

    // Sessions sorted by date descending
    const children = activeSessions
      .sort((session1, session2) => {
        return (
          new Date(session1.authTime).getTime() -
          new Date(session2.authTime).getTime()
        );
      })
      .map((session) => {
        return (
          <Session
            key={session.id}
            session={session}
            onSessionTerminate={this.props.onSessionTerminate}
          />
        );
      });

    return (
      <Fieldset legend="PreferencesModal.security.legend.active_sessions">
        {children}
      </Fieldset>
    );
  }

  render() {
    if (this.props.sessions.pending) {
      return (
        <div className={preferencesStyles.spinnerScreen}>
          <Spinner size="large" />
        </div>
      );
    }

    return (
      <div className={preferencesStyles.screen}>
        {this.renderCurrentSessions()}
        {this.renderActiveSessions()}
      </div>
    );
  }
}

export default PreferencesSecurity;
