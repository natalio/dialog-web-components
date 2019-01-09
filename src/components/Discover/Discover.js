/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow
 */

import type { Peer } from '@dlghq/dialog-types';
import type { Card } from '../DiscoverCard/DiscoverCard';
import React, { PureComponent, type Node } from 'react';
import classNames from 'classnames';
import { Text } from '@dlghq/react-l10n';
import Button from '../Button/Button';
import DiscoverCard from '../DiscoverCard/DiscoverCard';
import DiscoverFakeCard from '../DiscoverFakeCard/DiscoverFakeCard';
import Spinner from '../Spinner/Spinner';
import styles from './Discover.css';

export type Props = {
  className?: string,
  pending: boolean,
  error: string | Error,
  items: Array<Card>,
  onCreateNew: () => mixed,
  onGoToPeer: (peer: Peer) => mixed,
};

const MAX_FAKE_CARDS = 4;

class Discover extends PureComponent<Props> {
  renderCards(): Node {
    const { pending, items } = this.props;

    if (pending) {
      const cards = [];

      for (let i = 0; i < MAX_FAKE_CARDS; i++) {
        cards.push(
          <div className={styles.cardWrapper} key={`card_fake_${i}`}>
            <DiscoverFakeCard />
          </div>,
        );
      }

      return cards;
    }

    return items.map((card) => {
      return (
        <div className={styles.cardWrapper} key={`card_${card.peer.id}`}>
          <DiscoverCard {...card} onGoToPeer={this.props.onGoToPeer} />
        </div>
      );
    });
  }

  renderError(): Node {
    const { error } = this.props;

    if (!error) {
      return null;
    }

    const errorText = typeof error === 'string' ? error : error.message;

    return (
      <div className={styles.error}>
        <Text id={errorText} inline />
      </div>
    );
  }

  render() {
    const { pending } = this.props;
    const className = classNames(styles.container, this.props.className);

    return (
      <div className={className}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.title}>
              <Text id="Discover.title" inline />
              {pending ? (
                <Spinner
                  size="small"
                  type="dotted"
                  className={styles.spinner}
                />
              ) : null}
            </h1>
            <Text
              id="Discover.subtitle"
              tagName="h3"
              className={styles.subTitle}
            />
          </div>
          <div className={styles.headerControls}>
            <Button
              size="small"
              className={styles.headerButton}
              theme="primary"
              view="outline"
              disabled={pending}
              onClick={this.props.onCreateNew}
              id="discover_create_new_button"
            >
              <Text id="Discover.create_new" />
            </Button>
          </div>
        </header>
        {this.renderError()}
        <div className={styles.cards}>{this.renderCards()}</div>
      </div>
    );
  }
}

export default Discover;
