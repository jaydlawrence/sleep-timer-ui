import moment from 'moment';
// constants
import {
  APP_STATE_READY,
  APP_STATE_TIMING,
  URL_STUB_READY,
  URL_STUB_TIMING,
  URL_STUB_INITIALIZING,
  APP_STATE_DONE,
  URL_STUB_DONE,
  APP_STATE_ERROR,
  URL_STUB_ERROR
} from './constants';

export const formatTimeToFriendly = date => {
  let day = date.format('dddd');
  if (moment().isSame(date, 'day')) {
    day = 'today';
  }
  if (moment().add(1, 'day').isSame(date, 'day')) {
    day = 'tomorrow';
  }
  return `${date.format('LT')} ${day}`
}

export const formatPeriodToFriendlyMessage = ({ period, hours, minutes, currentTime }) => {
  const pluralHours = hours == 1 ? 'hour' : 'hours'
  const hoursText = !!hours ? `${hours} ${pluralHours}` : '';
  const minutesText = !!minutes ? `${minutes} minutes` : '';
  console.log("formatPeriodToFriendlyMessage -> hoursText", hoursText)
  console.log("formatPeriodToFriendlyMessage -> minutesText", minutesText)
  const andTest = (!!hours && !!minutes) ? `, ` : ''
  const wakeText = formatTimeToFriendly(moment(currentTime).add(period, 'second'));
  console.log("formatPeriodToFriendlyMessage -> wakeText", wakeText)
  console.log("formatPeriodToFriendlyMessage -> andTest", andTest)
  return `Nap for ${hoursText}${andTest}${minutesText} and wake up at ${wakeText}`;
}

export const formatTimeDiff = (time1, time2) => {
  const diff = time1.diff(time2);
  const duration = moment.duration(diff);
  const parts = [];
  const pluralHours = duration.hours() == 1 ? 'hour' : 'hours'
  if (duration.hours()) parts.push(`${duration.hours()} ${pluralHours}`);
  const pluralMinutes = duration.minutes() == 1 ? 'minute' : 'minutes'
  if (duration.minutes()) parts.push(`${duration.minutes()} ${pluralMinutes}`);
  const joined = parts.join(' and ');
  return joined || 'less than a minute'
}

export const pushToCorrectPageOnLoad = (state, history) => {
  switch (state) {
    case APP_STATE_READY:
      history.push(URL_STUB_READY);
      break;
    case APP_STATE_TIMING:
      history.push(URL_STUB_TIMING);
      break;
    case APP_STATE_DONE:
      history.push(URL_STUB_DONE);
      break;
    case APP_STATE_ERROR:
      history.push(URL_STUB_ERROR);
      break;
    default:
      history.push(URL_STUB_INITIALIZING);
  }
}