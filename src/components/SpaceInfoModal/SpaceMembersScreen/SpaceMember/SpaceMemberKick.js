/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import { Text } from '@dlghq/react-l10n';
import Spinner from '../../../Spinner/Spinner';
import Tooltip from '../../../Tooltip/Tooltip';
import Icon from '../../../Icon/Icon';
import errorToString from '../../../../../src/utils/errorToString';
import styles from './SpaceMember.css';

type Props = {
  error: ?string,
  pending: boolean,
  onClick: (event: SyntheticMouseEvent<>) => void
};

class SpaceMemberKick extends PureComponent<Props> {
  render() {
    if (this.props.pending) {
      return <Spinner type="round" className={styles.kickPending} />;
    }

    const error = errorToString(this.props.error);

    if (error) {
      return (
        <Tooltip
          text={error}
          theme="danger"
          options={{
            attachment: 'middle right',
            targetAttachment: 'middle left',
            constraints: [
              {
                to: 'window',
                attachment: 'together'
              }
            ]
          }}
        >
          <Icon glyph="error" className={styles.kickError} onClick={this.props.onClick} />
        </Tooltip>
      );
    }

    return (
      <div className={styles.kick} onClick={this.props.onClick}>
        <Text id="ChatActivity.kick" />
      </div>
    );
  }
}

export default SpaceMemberKick;
