import axios from 'axios';
import {GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT, STUDENTS_LOADING} from './types';

export const getStudents = () => dispatch => {
    dispatch(setStudentsLoading());
    axios
        .get('/api/students')
        .then((res) => 
            dispatch({
                type: GET_STUDENTS,
                payload: res.data.students
            }))
};

export const addStudent = (student) => dispatch => {
   axios
    .post('/api/students', student)
    .then(res => 
        dispatch({
            type: ADD_STUDENT,
            payload: res.data
        })
    )
};

export const deleteStudent = (id) => dispatch => {
   axios
   .delete(`api/students/${id}`)
   .then(res => 
        dispatch(
            {
                type: DELETE_STUDENT,
                payload: id
            }
        )
    )
};

export const setStudentsLoading = () => {
    return {
        type: STUDENTS_LOADING
    }
}

