/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import styles from './CreateNewModal.css';

type Props = {
  id: string,
  maxGroupSize: number,
  type: 'group' | 'channel',
  onChange: (value: string, event: SyntheticInputEvent<>) => void,
};

function CreateGroupTypeForm(props: Props) {
  return (
    <div className={styles.type}>
      <RadioGroup name="type" value={props.type} onChange={props.onChange}>
        <Radio value="group" htmlAutoFocus id={`${props.id}_type_group`}>
          <Text
            id="CreateNewModal.group.type.title"
            className={styles.typeLabel}
          />
        </Radio>
        <Text
          className={styles.typeHint}
          id="CreateNewModal.group.type.hint"
          values={{ count: String(props.maxGroupSize) }}
          tagName="div"
        />
        <br />
        <Radio value="channel" id={`${props.id}_type_channel`}>
          <Text
            id="CreateNewModal.channel.type.title"
            className={styles.typeLabel}
          />
        </Radio>
        <Text
          className={styles.typeHint}
          id="CreateNewModal.channel.type.hint"
          tagName="div"
        />
      </RadioGroup>
    </div>
  );
}

export default CreateGroupTypeForm;
