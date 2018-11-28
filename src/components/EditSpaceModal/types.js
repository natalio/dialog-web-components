/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Field, AvatarPlaceholder } from '@dlghq/dialog-types';

type SpaceUpdate = {
  name: string,
  shortname: ?string,
  avatar: ?(string | File)
}

export type Space = {
  id: number,
  type: string,
  avatar: File,
  name: string,
  shortname: string,
  placeholder: AvatarPlaceholder
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
