/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { User, ProfileSettings, AuthSession } from '@dlghq/dialog-types';
import type { Field } from '@dlghq/dialog-utils';

export type PreferencesScreen =
  | 'general'
  | 'notifications'
  | 'security'
  | 'shortcuts'
  | 'blocked';

export type Props = {
  className?: string,
  screen: PreferencesScreen,
  settings: ProfileSettings,
  sessions: Field<?Array<AuthSession>>,
  blocked: Field<?Array<User>>,
  onClose: () => mixed,
  onSettingsChange: (value: ProfileSettings) => mixed,
  onSessionTerminate: (id: number) => mixed,
  onAllSessionsTerminate: () => mixed,
  onUnblockUser: (id: number) => mixed,
  onScreenChange: (screen: PreferencesScreen) => mixed,
};
