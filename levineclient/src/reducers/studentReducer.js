import {GET_STUDENTS, DELETE_STUDENT, ADD_STUDENT, STUDENTS_LOADING} from '../actions/types';
const initialState = {
    students: [],
    loading: false
};

export default function(state=initialState, action){
    switch(action.type){
        case GET_STUDENTS:
            return{
                ...state,
                students: action.payload,
                loading: false
            };
        // case GET_STUDENT:
        //     return{
        //         ...state,
        //         students: state.stundents.id
        //     };
        case DELETE_STUDENT:
            return{
                ...state,
                students: state.students.filter(item => item.id !== action.payload)
            };
        case ADD_STUDENT:
            return{
                ...state,
                students: [action.payload, ...state.students]
            };
        case STUDENTS_LOADING:
            return{
                ...state,
                loading: true
            }
        default:
            return state;
    }
};