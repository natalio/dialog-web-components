/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { SelectorState } from '../../entities';
import type { PeerInfo } from '@dlghq/dialog-types';

export type Request = {
  title: string,
  shortname: string,
  avatar: ?string,
  members: SelectorState<PeerInfo>,
  about: string,
};

export type Step = 'info' | 'avatar' | 'members';

export type Props = {
  id: string,
  className?: string,
  step: Step,
  error: ?string,
  pending: boolean,
  request: Request,
  shortnamePrefix?: ?string,
  autoFocus: boolean,
  isPublicSpaceEnabled: boolean,
  onClose: () => mixed,
  onSubmit: () => mixed,
  onRequestChange: (request: Request) => mixed,
  onAvatarRemove: () => void,
  onAvatarEdit: (avatar: string) => void,
};

export type State = {
  step: Step,
  avatar: ?File,
};
