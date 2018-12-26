/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Props as UserProps } from './ActivityUserProfile';
import type { Props as GroupProps } from './ActivityGroupProfile';
import type { Props as SpaceProps } from './ActivitySpaceProfile';
import React from 'react';
import ActivityUserProfile from './ActivityUserProfile';
import ActivityGroupProfile from './ActivityGroupProfile';
import ActivitySpaceProfile from './ActivitySpaceProfile';

export type Props =
  | ({ type: 'user' } & UserProps)
  | ({ type: 'group' } & GroupProps)
  | ({ type: 'space' } & SpaceProps);

function ActivityProfile(props: Props) {
  switch (props.type) {
    case 'user':
      return (
        <ActivityUserProfile
          className={props.className}
          info={props.info}
          online={props.online}
          schema={props.schema}
          onAvatarClick={props.onAvatarClick}
        >
          {props.children}
        </ActivityUserProfile>
      );

    case 'group':
      return (
        <ActivityGroupProfile
          className={props.className}
          info={props.info}
          onAvatarClick={props.onAvatarClick}
          onCreatorClick={props.onCreatorClick}
        >
          {props.children}
        </ActivityGroupProfile>
      );

    case 'space':
      return (
        <ActivitySpaceProfile className={props.className} info={props.info} />
      );

    default:
      return null;
  }
}

export default ActivityProfile;
