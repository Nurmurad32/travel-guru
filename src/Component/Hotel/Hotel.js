import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import hotelData from '../../fakeData/hotelData';
import destinationData from '../../fakeData/travelData';
import './Hotel.css'
import starIcon from '../../images/Icon/star_1_.png'

import GoogleMap from '../Map/GoogleMap';
// import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const Hotel = () => {
    const {destId} = useParams()
    const destination = destinationData.find( destination => parseInt(destination.id) === parseInt(destId));
    console.log(destination.name);

    const hotel =hotelData.filter( hotel => parseInt(hotel.destinationId) === parseInt(destId))
    const [ hotelSearch , setHotelSearch ] = useState(hotel);

    
    console.log(hotelSearch);
     
    
    return ( 
        <>
            <Container>
                <Row style={{paddingTop:'50px'}}>
            
            <Col md={7} >
                <small style={{fontSize:'16px',color:'#2B2B2B'}}>252 stays Apr 13-17 3 guests</small>
                <h2 style={{fontWeight:'bold', fontSize:'24px',marginBottom: '29px'}}>Stay in {destination.name}</h2>
            {
                hotelSearch.map(hotel => 
                    <div className="hotel">
                        <div className="hotel-img">
                            <img src={hotel.image} alt=""/>
                        </div>
                        <div style={{marginLeft: '40px',width: '44%',marginTop: '10px'}}>
                            <h4 className="hotel-name">{hotel.name} <br/>
                                <span style={{color:'#6A6A6A',fontSize:'16px'}}>{hotel.capacity}</span>
                                <br/>
                                <span style={{color:'#6A6A6A',fontSize:'16px'}}>{hotel.description}</span>
                            </h4>
                            <div style={{display:'flex'}}>
                                <div style={{display: 'flex'}}>
                                <p  ><img src={starIcon} alt="" style={{height: '15px',width: '16px'}}/></p>
                                <p >{hotel.rating}</p>
                                </div>
                            
                                <p style={{color:'#6A6A6A',marginLeft: '25px'}}><span style={{color:'black'}}>${hotel.price}</span> /night</p>
                            </div>
            
                        </div>
                    </div>
                    
                )
            }
            </Col>
            <Col md={5}>
                <GoogleMap name={destination.name}></GoogleMap>
                
            </Col>
            </Row>
            </Container>
        </>
    );
};

export default Hotel;

