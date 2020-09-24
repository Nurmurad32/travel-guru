import React, { useContext } from 'react';
import './Header.css';
import logo from '../../images/Logo.png'
import { Form, FormControl, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSearch } from '@fortawesome/free-solid-svg-icons'


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedInUser.email);
    return (
        <div >
            <Navbar variant="light"   className="navbar-light">
                <Link to="/home">
                <img style={{backgroundColor:'white',marginRight: '50px'}}
                    src={logo}
                    width="100"
                    height="50"
                    className="d-inline-block align-top"
                    alt="React Bootstrap logo"/>
                </Link>
                <Form inline >
                    <FormControl type="text" placeholder="&#xf002; Search your Destination" className="mr-sm-6" />
                </Form>
                
                <Nav className="ml-auto">
                    <Link to="/home">Destination</Link>
                    <Link to="/blog">Blog</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/login">Login</Link> 
                   { loggedInUser &&
                        <Link onClick={() => setLoggedInUser({ })}>logout</Link>
                   }
                    
                    <p style={{color:'orange'}}>{loggedInUser.name} </p>
                    
                    
                </Nav>
            </Navbar>
            
            
        </div>
    );
};

export default Header;