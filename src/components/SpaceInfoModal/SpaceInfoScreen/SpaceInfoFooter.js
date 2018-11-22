/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React, { PureComponent } from 'react';
import Button from '../Button/Button';
import ModalFooter from '../Modal/ModalFooter';
import styles from '../../EditGroupModal/EditGroupModal.css';
import Text from '@dlghq/react-l10n/src/Text';

class TextMessagePreview extends PureComponent<Props> {
  render() {
    return (
      <ModalFooter className={styles.footer}>
        <Button
          wide
          theme="success"
          rounded={false}
          loading={this.isPending()}
          disabled={!this.isChanged() || this.isPending()}
          onClick={this.handleSubmit}
          id="edit_group_submit_button"
        >
          <Text id="EditGroupModal.submit" />
        </Button>
      </ModalFooter>
    );
  }
}

export default TextMessagePreview;
