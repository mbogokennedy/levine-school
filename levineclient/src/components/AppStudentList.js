import React, {Component} from 'react';
import {Container, Button, Table} from 'reactstrap';
import {CSSTransition} from 'react-transition-group';
import {connect} from 'react-redux';
import { getStudents, deleteStudent } from '../actions/studentAction';
import PropTypes from 'prop-types';

class StudentList extends Component {
    componentDidMount() {
        this.props.getStudents();
    }
    onDeleteClick = id => {
        this.props.deleteStudent(id);
    }
    render() {
        const {students} = this.props.student;
        return ( 
            <Container>
                    <Table hover responsive>
                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Student Age</th>
                                <th>Student Class</th>
                                <th>Student Contact</th>
                                <th>Admision Date</th>
                            </tr>
                        </thead>
                       
                            <tbody>
                            { 
                                students.map(({
                                id,
                                student_name,
                                student_age,
                                student_class,
                                parent_contact,
                                admission_date
                                }) => (
                                    <CSSTransition  key = {id} timeout = {500} classNames= "fade" >
                                        <tr>
                                        <th scope="row">{student_name}</th>
                                        <td>{student_age}</td>
                                        <td>{student_class}</td>
                                        <td>{parent_contact}</td>
                                        <td>{admission_date}</td>
                                        <td>
                                            <Button
                                            className="remove-btn"
                                            color="danger"
                                            size="sm"
                                            style = {
                                                {
                                                    marginLeft: "2rem",
                                                    marginTop: "0.8rem"
                                                }
                                            }
                                            onClick={this.onDeleteClick.bind(this, id)}
                                            >&times;
                                                
                                            </Button>
                                        </td>
                                        </tr>
                                    </CSSTransition>
                                ))}
                        </tbody>
                    </Table>
            </Container >
        )
    }
}

StudentList.propTypes = {
    getStudents: PropTypes.func.isRequired,
    student: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    student: state.student
})

export default connect(mapStateToProps, {getStudents, deleteStudent})(StudentList);