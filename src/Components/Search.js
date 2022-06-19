import React, { useState, useEffect } from 'react';
import { useStudentContext } from '../context/student.context';

// `joiningDate` && `validityDate` format "yyyy-mm-dd"

function checkValidity(joiningDate, validityDate) {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const [year, month, day] = joiningDate.split('-');
  const [yyyy, mm, dd] = validityDate.split('-');
  const maxValid = new Date(yyyy, mm - 1, dd);
  const selected = new Date(year, month - 1, day);
  return maxValid >= selected && maxValid >= today;
}

const initialInput = {
  studentName: '',
  joiningDate: '',
};

const findValidStudent = (studentName, validStudents) => {
  //a helper function to check if student name is valid
  const validStudentList = validStudents.filter(
    (student) =>
      student.name.toLocaleLowerCase() === studentName.toLocaleLowerCase()
  );
  console.log(validStudentList);
  return validStudentList[0];
};

function Search() {
  const { showError, validStudents, setStudentState, residentsList } =
    useStudentContext();
  const [userInput, setUserInput] = useState(initialInput);
  const { studentName, joiningDate } = userInput;
  console.log(userInput);

  const onChangeHandler = (e) => {
    //comments
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const clearInput = () => {
    //comments
    setUserInput(initialInput);
  };

  const addResidentHandler = () => {
    const { studentName, joiningDate } = userInput;

    //check studentName is valid
    const validStudent = findValidStudent(studentName, validStudents);
    console.log(validStudent);
    if (!validStudent) {
      setStudentState((originState) => {
        return {
          ...originState,
          showError: true,
          currentStudentName: studentName,
          errorType: 'name',
        };
      });

      return;
    }
    //check the joining date is valid
    const { validityDate } = validStudent;
    const isJoiningDateValid = checkValidity(joiningDate, validityDate);
    if (!isJoiningDateValid) {
      setStudentState((originState) => {
        return {
          ...originState,
          showError: true,
          currentStudentName: validStudent.name,
          errorType: 'date',
        };
      });

      return;
    }
    //add student to resident list
    setStudentState((originState) => {
      return {
        ...originState,
        residentsList: [...originState.residentsList, validStudent.name],
      };
    });
  };

  useEffect(() => {
    clearInput();
  }, [residentsList, showError]);

  useEffect(() => {
    setStudentState((originState) => {
      return {
        ...originState,
        showError: false,
      };
    });
  }, [residentsList, setStudentState]);

  return (
    <div className='my-50 layout-row align-items-end justify-content-end'>
      <label htmlFor='studentName'>
        Student Name:
        <div>
          <input
            id='studentName'
            name='studentName'
            data-testid='studentName'
            type='text'
            className='mr-30 mt-10'
            value={studentName}
            onChange={onChangeHandler}
          />
        </div>
      </label>
      <label htmlFor='joiningDate'>
        Joining Date:
        <div>
          <input
            id='joiningDate'
            name='joiningDate'
            data-testid='joiningDate'
            type='date'
            className='mr-30 mt-10'
            value={joiningDate}
            onChange={onChangeHandler}
          />
        </div>
      </label>
      <button
        type='button'
        data-testid='addBtn'
        className='small mb-0'
        onClick={addResidentHandler}
      >
        Add
      </button>
    </div>
  );
}

export default Search;
