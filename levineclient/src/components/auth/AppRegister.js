import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/auth';
import classnames from 'classnames';

import {
    Form,
    Input,
    Label,
    FormGroup,
    Button
} from 'reactstrap'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        password_confirm: '',
        errors: {}
    };
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.props.registerUser(newUser, this.props.history);
        e.target.reset();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    render() {
        const { errors } = this.state;
        return(
            <div className="row">
            <div className="col-sm-12 col-md-6 offset-md-3">
            <h2 className="text-center" style={{marginBottom: '1rem'}}>Register</h2>
            <p style={{fontSize: '1rem'}}>Enter the required details to continue </p>
            <Form onSubmit={ this.handleSubmit }>
                <FormGroup >
                    <Label for="name">Name</Label>
                    <Input
                    type="text"
                    placeholder="Name"
                    className={classnames({'is-invalid': errors.name})}
                    id="name"
                    name="name"
                    onChange={ this.handleInputChange }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    <Label for="email">Email</Label>
                    <Input
                    type="email"
                    id="email"
                    placeholder="Email"
                    className={classnames({'is-invalid': errors.email})}
                    name="email"
                    onChange={ this.handleInputChange }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <Label for="password">Password</Label>
                    <Input
                    type="password"
                    id="password"
                    className={classnames({'is-invalid': errors.password})}
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    <Label for="password_confirm">Confirm Password</Label>
                    <Input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    className={classnames({'is-invalid': errors.password_confirm})}
                    name="password_confirm"
                    onChange={ this.handleInputChange }
                    />
                    {errors.password_confirm && (<div className="invalid-feedback">{errors.password_confirm}</div>)}
                    <Button type="submit" style={{
                        marginTop: "0.5rem"

                    }} color="primary" size="lg">
                        Register User
                    </Button>
                </FormGroup>
            </Form>
        </div>
        </div>
        );
    };
};
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register))