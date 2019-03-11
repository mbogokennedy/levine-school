import React, { Component } from 'react';
import {
    Form,
    Input,
    Label,
    FormGroup,
    Button,
    Col
} from 'reactstrap'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import classnames from 'classnames';
class Login extends Component {
    state = {
        email: '',
        password: '',
        errors: {}
    };

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.props.loginUser(user);
        
        const { history } = this.props;
        history.push('/');
    };

    componentWillReceiveProps(nextProps) {

        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    componentDidMount() {
        const { history } = this.props;
        if(this.props.auth.isAuthenticated) {
            history.push('/');
        }
        
    }

    render() {
        const {errors} = this.state;
        return(
            <div className="row ">
            <Col md={{size:"6", offset:"3"}}>
            <h2 className="text-center" style={{marginBottom: '1rem'}}>Login</h2>
            <p style={{fontSize: '1rem'}}>Enter your Login details to continue </p>
            <Form onSubmit={ this.handleSubmit } >
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                    type="email"
                    placeholder="Email"
                    className={classnames({'is-invalid': errors.email})}
                    name="email"
                    onChange={ this.handleInputChange }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                    <Label for="password">Password</Label>
                    <Input
                    type="password"
                    placeholder="Password"
                    className={classnames({'is-invalid': errors.password})} 
                    name="password"
                    onChange={ this.handleInputChange }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                    <Button type="submit" style={{
                        marginTop: "0.5rem"
                    }} color="primary" size="lg">
                        Login
                    </Button>
                </FormGroup>
            </Form>
        </Col>
        </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(Login)