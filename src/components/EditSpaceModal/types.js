/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field, AvatarPlaceholder, GroupMember } from '@dlghq/dialog-types';

type SpaceUpdate = {
  name: string,
  shortname: ?string,
  avatar: ?(string | File)
}

export type SpaceType = 'space';

export type Space = {
  id: number,
  type: SpaceType,
  name: string,
  shortname: string,
  avatar: ?string,
  bigAvatar: ?string,
  placeholder: AvatarPlaceholder,
  adminId: number,
  isMember: boolean,
  members: GroupMember[]
}

export type Props = {
  space: Space,
  context: {
    name: Field<string>,
    shortname: Field<string>,
    avatar: Field<string>
  },
  className?: string,
  shortnamePrefix?: ?string,
  onClose: () => void,
  onSubmit: (space: Space, update: SpaceUpdate) => mixed
};

export type State = {
  screen: 'info' | 'avatar',
  space: SpaceUpdate
}
