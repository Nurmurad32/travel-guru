import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fakeData from '../../fakeData/travelData';
import './Destination.css';
import Slider from 'react-animated-slider';
import horizontalCss from 'react-animated-slider/build/horizontal.css';


const Destination = () => {
    
    const [ destination , setDestination ] = useState(fakeData);
    useEffect(()=>{
        fetch(fakeData)
        .then(res=>res.json())
        .then(data=>setDestination(data))
            } ,[])

    return (
        <div className="background">
        <Container>
            <Row>
            {
                <>
                    <Slider classNames={horizontalCss} autoplay="1000">
                        {destination.map((item, index) => ( 
                            
                            <div style={{display:'flex',marginTop:'80px'}}>
                                <div style={{width:'40%', color:'white',marginLeft: '8%'}}>
                                    <h1 style={{lineHeight:'116px'}}> {item.name}</h1>
                                    <p style={{marginRight:'25px'}}>{item.shortDescription}</p>
                                    <Link to={"/destination/" + item.id}>
                                        <button style={{textAlign: 'center',margin: '0 auto',fontSize: '16px',height: '60px',marginLeft: '10px', backgroundColor:'#F9A51A',border:'none', width: '30%'}}>Booking </button>

                                    </Link>
                                </div>
                            
                                <div key={index} style={{width:'50%'}}>
                                    <Card style={{ borderRadius: '20px',border: 'none',width: '30rem' }} >
                                        <Card.Img variant="top" src={item.img} style={{  width: '100%', height: '300px' }} />
                                    </Card> 
                                </div>
                            </div>
                        ))}
                    </Slider>
                    </>
            }
            </Row>
        </Container>
        </div>
    );
};


export default Destination;