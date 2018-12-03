/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field, AvatarPlaceholder, GroupMember } from '@dlghq/dialog-types';

export type SpaceType = 'space';
export type SpaceFields = 'name' | 'shortname';

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
  onSubmit: () => void,
  onAvatarRemove: () => void,
  onAvatarEdit: (avatar: string) => void,
  onFieldChange: (value: mixed, field: ?(string |SpaceFields)) => void,
  isChanged: boolean
};

export type State = {
  screen: 'info' | 'avatar',
  avatar: ?File
}
