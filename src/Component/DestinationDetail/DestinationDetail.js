import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useHistory, useParams } from 'react-router-dom';

import fakeData from '../../fakeData/travelData';
import './DestinationDetail.css';


const DestinationDetail = () => {
    const {id} = useParams();
    console.log(id);
    const destination = fakeData.find( destination => parseInt(destination.id) === parseInt(id));
    console.log(destination.name);

    const history = useHistory();
    function handleBooking() {
        history.push(`/hotel/${destination.id}`);
    }


    return (
        <div className="background" >
             
            <Container style={{}}>
                <Row className="destination-row" style={{paddingTop:'150px',margin:'0 auto'}}>
                    <Col md={7} style={{ color:'white'}} className="destination-text">
                        <h1>{destination.name}</h1>
                        <p>{destination.description}</p>
                    </Col>
                    <Col md={5} style={{ color:'black', width:'80%'}}>
                        <Form className="destination-form" >
                            <Form.Group className="form-grp">
                                <Form.Label className="label">Origin</Form.Label>
                                <Form.Control className="input" type="text"  variant="light"/>
                            </Form.Group>
                            <Form.Group className="form-grp">
                                <Form.Label className="label">Destination</Form.Label>
                                <Form.Control className="input" type="text"  />
                            </Form.Group>
                            <Form.Group className="form-grp" style={{display:"flex"}}>
                                <div style={{width:'50%'}}>
                                    <Form.Label className="label">From</Form.Label>
                                    <Form.Control className="input" type="date" style={{width:'93%'}}/>
                                </div>
                                <div style={{marginLeft:'3px',width:'50%'}}>
                                    <Form.Label className="label">To</Form.Label>
                                    <Form.Control className="input" type="date" style={{width:'93%'}}/>
                                    
                                </div>
                            </Form.Group>
                                
                                    <Button type="submit" className="booking-btn-hotel" style={{backgroundColor: '#F9A51A',marginLeft:'10px',width: '95%',textAlign: 'center',margin: '0 auto',fontSize: '16px',height: '60px',marginLeft: '10px'}} onClick={handleBooking}>
                                       <span style={{color:'black'}}>Start Booking</span> 
                                    </Button>
                                
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default DestinationDetail;