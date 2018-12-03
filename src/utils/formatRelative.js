/*
 * Copyright 2018 dialog LLC <info@dlg.im>
 * @flow
 */
import format from 'date-fns/format';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import getLocalTimeFormat from './getLocalTimeFormat';

type Options = {
  locale: string,
};

const formatRelativeLocale = {
  en: {
    yesterday: '[yesterday at] ',
    today: '[today at] ',
    other: 'MMM, D [at] ',
  },
  ru: {
    yesterday: '[вчера в] ',
    today: '[сегодня в] ',
    other: 'D MMM [в] ',
  },
};

function formatRelative(date: Date, baseDate: Date, options: Options): string {
  const { locale } = options;
  const diff = differenceInCalendarDays(date, baseDate);

  if (isNaN(diff)) {
    return 'Invalid Date';
  }

  let token = '';

  if (diff < 0) {
    token = 'yesterday';
  } else if (diff < 1) {
    token = 'today';
  } else {
    token = 'other';
  }

  const time = getLocalTimeFormat(locale);
  const formatStr = `${formatRelativeLocale[locale][token]}${time}`;

  return format(date, formatStr);
}

export default formatRelative;
