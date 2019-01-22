/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { AvatarPlaceholder } from '@dlghq/dialog-types';

export type SpaceType = 'global' | 'private' | 'public';

export type Space = {
  id: string,
  type: SpaceType,
  createdAt: number,
  title: string,
  shortname: string,
  about: string,
  modifiedAt: number,
  deletedAt: number,
  ownerId: number,
  avatar?: string,
  placeholder: AvatarPlaceholder,
};
