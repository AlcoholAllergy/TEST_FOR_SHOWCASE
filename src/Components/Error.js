import React from 'react';
import { useStudentContext } from '../context/student.context';

const errorMsgMap = {
  name: ` is not a verified student!`,
  date: `'s validity has Expired!`,
};

function Error() {
  const { currentStudentName, errorType } = useStudentContext();
  console.log(currentStudentName, errorType);

  return (
    <div data-testid='errorMsg' className='alert error mt-20 slide-up-fade-in'>
      {`Sorry, ${currentStudentName}${errorMsgMap[errorType]}`}
    </div>
  );
}

export default Error;
