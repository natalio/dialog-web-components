/*
 * Copyright 2018 dialog LLC <info@dlg.im>
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
  settings: ProfileSettings,
  sessions: Field<?Array<AuthSession>>,
  blocked: Field<?Array<User>>,
  onClose: () => mixed,
  onSettingsChange: (value: ProfileSettings) => mixed,
  onSessionsLoad: () => mixed,
  onSessionTerminate: (id: number) => mixed,
  onAllSessionsTerminate: () => mixed,
  onBlockedLoad: () => mixed,
  onUnblockUser: (id: number) => mixed,
};
