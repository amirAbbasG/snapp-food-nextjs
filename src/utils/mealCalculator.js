export const getMeal = () => {
  const hours = new Date().getHours().toLocaleString('en-US', {hour12: true});
  if (4 < hours && hours < 11) {
    return 'صبحانه';
  } else if (10 < hours && hours < 15) {
    return 'ناهار';
  } else if (17 < hours && hours < 24) {
    return 'شام';
  } else {
    return 'میان وعده';
  }
};
