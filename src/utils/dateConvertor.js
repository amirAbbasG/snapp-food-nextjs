import moment from 'jalali-moment';

export const getPersianDate = dateValue => {
  const dateTime = new Date(dateValue);
  const date =
    dateTime.getFullYear() +
    '/' +
    (dateTime.getMonth() + 1) +
    '/' +
    dateTime.getDate();
  const persianDate = moment(date, 'YYYY/MM/DD')
    .locale('fa')
    .format('YYYY/MM/DD');
  return persianDate;
};
export const getClock = dateValue => {
  const dateTime = new Date(dateValue);
  const clock = dateTime.getHours() + ':' + dateTime.getMinutes();
  return clock;
};
