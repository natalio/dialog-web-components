/*
 * Copyright 2019 dialog LLC <info@dlg.im>
 * @flow strict
 */

import type { UserOnlineState } from '../components/UserOnline/UserOnline';
import differenceInSeconds from 'date-fns/difference_in_seconds';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import getDateFnsLocale from './getDateFnsLocale';

export function getUserLastSeenDate(online: UserOnlineState): Date {
  const { lastSeen, updateDate } = online;

  if (lastSeen) {
    const delta = differenceInSeconds(updateDate, lastSeen);

    if (delta > 60) {
      return lastSeen;
    }
  }

  return updateDate;
}

export function getUserLastSeen(
  online: UserOnlineState,
  locale: string,
): string {
  return distanceInWordsToNow(getUserLastSeenDate(online), {
    addSuffix: true,
    includeSeconds: false,
    locale: getDateFnsLocale(locale),
  });
}
