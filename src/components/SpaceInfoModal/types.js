/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */
import type { SelectorState } from '../../entities';
import type { PeerInfo, GroupMember } from '@dlghq/dialog-types';

export type Screen = 'info' | 'members' | 'addMembers' | 'invitationLink';
export type ConfirmScreen = 'leave' | 'delete';

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

export type SpaceMember = GroupMember & {
  kickState: {
    pending: boolean,
    error: ?string
  }
};

export type Props = {
  uid: number,
  className?: string,
  space: Space,

  isCreator: boolean,
  isAdmin: boolean,

  onClose: () => void,

  membersSelector: SelectorState<PeerInfo>,
  onMembersChange: (selector: SelectorState<PeerInfo>) => mixed,
  autoFocusAddMember: boolean,
  onSubmitAddMembers: (gid: number, uids: number[]) => mixed,
  pendingAddMembers: boolean,

  notificationEnabled: boolean,
  onNotificationChange: () => void,

  invitationLink: string,
  handleRevoke: () => void,
  invitationLinkPending: boolean,

  onLeaveSpace: () => void,
  onDeleteSpace: () => void,

  onlineMessage: string,
  members: SpaceMember[]
}

export type State = {
  screen: Screen,
  confirmEnabled: boolean,
  confirmScreen: ConfirmScreen,
  space: SpaceUpdate,
}
