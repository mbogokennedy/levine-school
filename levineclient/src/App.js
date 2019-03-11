import React, { Component } from 'react';
import {Container,  Jumbotron } from 'reactstrap';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/auth';

import store from './store';
import AppNavbar from './components/AppNavbar';
import StudentList from './components/AppStudentList';
import AddStudent from './components/AddStudent';
import Home from './components/AppHome';
import About from './components/AppAbout';
import AppRegister from './components/auth/AppRegister';
import AppLogin from './components/auth/AppLogin';


import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import "./assets/css/font-awesome.min.css"

if(localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken);
    store.dispatch(setCurrentUser(decoded));
  
    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      store.dispatch(logoutUser());
      window.location.href = '/accounts/login'
    }
}

class App extends Component {
    render() {
        return ( 
            <Provider store={store}>
                <Router>
                    <div className = "App" >
                        <AppNavbar/>  
                        <Route exact path="/" component = {Home}/>
                        
                        <Container>
                            <Route exact path="/about" component = {About}/>
                            <Route exact path="/students" render = {props => (
                                <React.Fragment>
                                    <Jumbotron fluid className="text-center mt-3">
                                        <Container fluid>
                                        <h1 className="display-4">Welcome to the Student area</h1>
                                        <p className="lead">Enroll to become a student at Levine Coding School</p>
                                        </Container>
                                    </Jumbotron>
                                    <AddStudent/>
                                    <StudentList/>
                                </React.Fragment>
                            )} />
                            <Route exact path="/accounts/login" component = {AppLogin}/>
                            <Route exact path="/accounts/register" component = {AppRegister}/>
                        </Container>
                    </div >
                </Router>
            </Provider>
        );
    }
}

export default App;