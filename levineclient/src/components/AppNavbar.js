import React, {Component} from 'react';

import {Link, withRouter} from 'react-router-dom';
import {
    Navbar,
    NavItem,
    DropdownItem,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    Container,
    DropdownToggle,
    UncontrolledDropdown,
    DropdownMenu,
    NavLink
} from 'reactstrap'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/auth';
class AppNavbar extends Component {
    state = {
        isOpen: false,
    }
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        }) 
    }

    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser(this.props.history);
    }
    render() {
    const {isAuthenticated, user} = this.props.auth;
    const commonLinks = (
        <Nav navbar className="lead">
            <NavItem>
            <Link className="nav-link text-success mr-4" onClick = {this.toggle} to="/">Home</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link text-success mr-4" onClick = {this.toggle} to="/about">About</Link>
            </NavItem>
            <NavItem>
            <Link className="nav-link text-success mr-4" onClick = {this.toggle} to="/students">Students</Link>
            </NavItem>
            <UncontrolledDropdown nav inNavbar >
            <DropdownToggle id="carriculum" className="mr-5 text-success" nav caret>
                Courses
            </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                    <Link className="nav-link text-success" onClick = {this.toggle}  style={{ color:"#333"}} to="/courses/Python">Python Course</Link>
                    </DropdownItem>
                    <DropdownItem>
                    <Link className="nav-link text-success" onClick = {this.toggle}  style={{ color:"#333"}} to="/courses/Java/">Java</Link>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                    <Link className="nav-link text-success" onClick = {this.toggle} style={{ color:"#333"}} to="/courses/JavaScript/">
                        JavaScript
                    </Link>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        </Nav>
    )
    const authLinks = (
        <Nav navbar className="ml-auto">
            { commonLinks }
            <div >
            <NavItem onClick = {this.toggle} style={{ cursor: 'pointer'}}>
                <NavLink className="nav-link text-success" onClick={this.onLogout.bind(this)}>
                    <img src={user.avatar} alt={user.name} title={user.name}
                        className="rounded-circle"
                        style={{ width: '25px'}}/>
                        Logout
                </NavLink>
            </NavItem>
            </div>
        </Nav>
    )
  const guestLinks = (
    <Nav navbar className="ml-auto">
        {commonLinks}
        <Link className="nav-link text-success" onClick = {this.toggle} to="/accounts/login">Login</Link>
        
        <Link className="nav-link text-success" onClick = {this.toggle} to="/accounts/register">Register</Link>
    </Nav>
  )
    return (
        <div>
          <Navbar color="dark" light expand="md" className="lead impact">
            <Container>
                <NavbarBrand style={{fontSize:"1.5rem", cursor: "pointer"}}>
                    <Link className="navbrand-color navbar-nav nav-link" to="/">Levine Coding School</Link>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse  isOpen={this.state.isOpen} navbar>
                    {isAuthenticated ? authLinks : guestLinks}
                </Collapse>
            </Container>
          </Navbar>
        </div>
      );
    }
}
AppNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(AppNavbar));