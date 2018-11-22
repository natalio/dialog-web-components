/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

export type Screen = 'info' | 'members' | 'addMembers' | 'avatar' | 'edit';

type SpaceUpdate = {
  name: string,
  shortname: string,
  avatar: ?(string | File)
}

/**
 * TODO: Space type to @dlghq/dialog-types; need info to know, what data will be represented in this interface
 */
type Space = {
  id: number,
  name: string,
  avatar: ?string,
  shortname: string
}

export type Props = {
  id: string,
  className?: string,
  space: Space
}

export type State = {
  screen: Screen,
  space: SpaceUpdate,
  confirmationScreen: boolean
}
