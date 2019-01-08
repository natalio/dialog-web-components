/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */

import React from 'react';
import { random } from 'lodash';
import styles from './DiscoverFakeCard.css';

function DiscoverFakeCard() {
  const linesCount = random(6, 22);
  const linesArray = [];

  for (let i = 1; i <= linesCount; i++) {
    linesArray.push(random(50, 200));
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.avatar} />
        <div className={styles.body}>
          <div className={styles.title}>
            <div className={styles.icon} />
            <div className={styles.line} style={{ width: random(80, 320) }} />
          </div>
          <div
            className={styles.shortname}
            style={{ width: random(60, 120) }}
          />
          <div className={styles.text}>
            {linesArray.map((lineWidth, index) => (
              <div
                key={index}
                className={styles.line}
                style={{ width: lineWidth }}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.members}>
          <div className={styles.membersIcon} />
          <div className={styles.line} style={{ width: 30 }} />
        </div>
        <div className={styles.creator}>
          <div className={styles.line} style={{ width: 60 }} />
          <div className={styles.line} style={{ width: random(40, 100) }} />
        </div>
      </div>
    </div>
  );
}

export default DiscoverFakeCard;
