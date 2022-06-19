import React, { useState, useContext } from 'react';
import { STUDENTS } from '../studentsList';

const initialStudentState = {
  validStudents: STUDENTS,
  residentsList: [],
  currentStudentName: '',
  showError: false,
  errorType: '',
  errorMsg: '',
  setStudentState: () => null,
};
export const StudentContext = React.createContext(initialStudentState);

const StudentProvider = ({ children }) => {
  const [studentState, setStudentState] = useState(initialStudentState);
  return (
    <StudentContext.Provider
      value={{ ...studentState, setStudentState: setStudentState }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export default StudentProvider;

export const useStudentContext = () => {
  //the custmized hook returning the context value
  return useContext(StudentContext);
};
