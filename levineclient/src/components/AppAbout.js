import React, { Component } from 'react';
import { Jumbotron, Container } from 'reactstrap';

export default class About extends Component {
    render() {
        return (
            <div>
                <Jumbotron fluid className="mt-3 text-center">
                    <Container fluid>
                    <h1 className="display-4">This is the about page</h1>
                    <p className="lead">We at Levine Coding School offer web and mobile application development, programming and Data science courses in Java, JavaScript and Python Languages.</p>
                    </Container>
                </Jumbotron>
            </div>
        );
    }
}