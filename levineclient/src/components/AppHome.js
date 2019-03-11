import React, { Component } from 'react';
import {Container, Row, Col, Button, Card, 
    CardBody, CardHeader, CardFooter, CardImg,
    CardText, CardTitle
} from 'reactstrap';
import python from '../assets/images/python.jpg';
import js from '../assets/images/js.png';
import java from '../assets/images/java.jpg';


export default class Home extends Component {
    render() {
        return (
        <div>
            <div className="home-section">
                <div className="display">
                    <div className="home-inner">
                        <Container>
                            <Row>
                                <Col md={{size:"8", offset:"2"}} className="d-none d-lg-block">
                                    <h2 className="display-4 text-center text-white">Enjoy <strong className="text-info">Premium Coding Tutorials</strong> and save money</h2>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
            <div  className="mt-4">
                <Container>
                    <Row>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    <CardImg top width="100%" height="200px" src={python} alt="Card image cap" />
                                    <CardTitle className="text-center h2 mt-3">Python</CardTitle>
                                </CardHeader>
                                <CardBody>
                                <CardText>With supporting text below as a natural lead-in to additional content. With supporting text below as a natural lead-in to additional content.</CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button size="sm" block>Find more</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    <CardImg top width="100%" height="200px" src={java} alt="Card image cap" />
                                    <CardTitle className="text-center h2 mt-3">Java</CardTitle>
                                </CardHeader>
                                <CardBody>
                                <CardText>With supporting text below as a natural lead-in to additional content. With supporting text below as a natural lead-in to additional content.</CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button size="sm" block>Find more</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col md="4">
                            <Card>
                                <CardHeader>
                                    <CardImg top width="100%" height="200px" src={js} alt="Card image cap" />
                                    <CardTitle className="text-center h2 mt-3">JavaScript</CardTitle>
                                </CardHeader>
                                <CardBody>
                                <CardText>With supporting text below as a natural lead-in to additional content. With supporting text below as a natural lead-in to additional content.</CardText>
                                </CardBody>
                                <CardFooter>
                                    <Button size="sm" block>Find more</Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
        );
    }
}