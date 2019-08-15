import React from 'react';
import moment from 'moment';

function PrettyDate({ date, fallback }) {
  const momentDate = moment(new Date(date));
  const validDate = momentDate.isValid();

  return validDate ? (
    <> {moment(date).format('MMM Do YYYY, h:mm a')}</>
  ) : (
    <>{fallback}</>
  );
}

export default PrettyDate;
