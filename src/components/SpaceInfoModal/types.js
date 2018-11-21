/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */


export type Step = 'info' | 'addMembers' | 'members' | 'edit' | 'avatar';


export type Props = {
  id: string,
  className?: string,
  step: Step
}
