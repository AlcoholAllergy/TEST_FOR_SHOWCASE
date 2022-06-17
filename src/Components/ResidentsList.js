import React from 'react';
import { useStudentContext } from '../context/student.context';

function ResidentsList() {
  const { residentsList } = useStudentContext();
  return (
    <div className='pa-10 mt-10 w-75'>
      <div className='font-weight-bold text-center'>Residents List</div>
      <ul className='mt-10 styled w-50 mx-auto' data-testid='residentsNameList'>
        {residentsList.map((resident, index) => {
          return (
            <li key={index} className='slide-up-fade-in'>
              {resident}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ResidentsList;
