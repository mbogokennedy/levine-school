import React, {
    Component
} from 'react';
import {
    Modal, ModalBody, Form, FormGroup, Label,
    Input, ModalHeader, Button
} from 'reactstrap';

import {connect} from 'react-redux';
import {addStudent} from '../actions/studentAction';


class AddStudent extends Component {
    state = {
        modal: false,
        student_name: '',
        student_age: 0,
        student_class: '',
        parent_contact: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    onSubmit = (e) =>{
        e.preventDefault();

        const student = {
            student_name: this.state.student_name,
            student_age: this.state.student_age,
            student_class: this.state.student_class,
            parent_contact: this.state.parent_contact
        };

        //add student to the list
        this.props.addStudent(student);

        // close modal
        this.toggle();
    }
    render() {
        return(
            <div>
                <Button
                color = "dark"
                style = {
                    {
                        marginBottom: "2rem",
                        marginTop: "2rem"
                    }
                }
                onClick = {this.toggle}>
                    Become a Student
                </Button>

                <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
                    <ModalHeader toggle = {this.toggle}>
                        Enroll as a Student
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for="student_name">Student Name</Label>
                                <Input type="text" 
                                name="student_name" 
                                id ="studentName" 
                                placeholder="Add the student name" 
                                onChange={this.onChange}/>
                                <Label for="student_age">Student Age</Label>
                                <Input type="number" 
                                name="student_age"
                                id ="studentAge" 
                                placeholder="Add the student age" 
                                onChange={this.onChange} />
                                <Label for="student_class">Student Level</Label>
                                <Input type="text" 
                                name="student_class"
                                id ="studentClass" 
                                placeholder="Add the student class" 
                                onChange={this.onChange} />
                                <Label for="parent_contact">Student Contact</Label>
                                <Input type="text" 
                                name="parent_contact" 
                                id ="parentContact" 
                                placeholder="Add the Parent's Contact" 
                                onChange={this.onChange}/>
                                <Button
                                color="dark"
                                style = {{
                                    marginTop: '2rem'
                                }}
                                block
                                >Enroll</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    student: state.student
})

export default connect(mapStateToProps, { addStudent })(AddStudent)