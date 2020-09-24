import React, { createContext, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Blog from './Component/Blog/Blog';
import Contact from './Component/Contact/Contact';
import Destination from './Component/Destination/Destination';
import DestinationDetail from './Component/DestinationDetail/DestinationDetail';
import Header from './Component/Header/Header';
import Hotel from './Component/Hotel/Hotel';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]} >
    
    
      <Router>
      <Header></Header>
      
        <Switch>
          <Route exact path="/">
            <Destination></Destination>
          </Route>
          <Route path="/home">
            <Destination></Destination>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/blog">
            <Blog></Blog>
          </Route>
          <Route path="/contact">
            <Contact></Contact>
          </Route>
          <Route path="/destination/:id">
            <DestinationDetail></DestinationDetail>
          </Route>
          <PrivateRoute path="/hotel/:destId">
            <Hotel></Hotel>
          </PrivateRoute>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </Router>
      
      </UserContext.Provider>
  );
}

export default App;
