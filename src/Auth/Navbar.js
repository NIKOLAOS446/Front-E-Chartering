import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";




function Navbar(props) {

    
    return (
        <div>
        <div style={{ zIndex: -100 }}>
            <div className="ocean">
                <div className="wave"></div>
                <div className="wave"></div>
            </div>
        </div>
            <nav
                className="navbar is-light"
                style={{ height: "60px" }}
                role="navigation"
                aria-label="main navigation"
            >
                <div className="navbar-brand">
                    <a className="navbar-item" >
                        <h1 className="title is-3">E-Chartering</h1>
                        
                    </a>
                    <a
                        role="button"
                        className="navbar-burger"
                        aria-label="menu"
                        aria-expanded="false" >

                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                   </a> 
                </div>
                    <div className="navbar-menu">
                        <div className="navbar-start"></div>

                        <div className="navbar-end">
                            <div className="navbar-item">                            
                            <div className="buttons">
                            <p className="control">
                            <Link to="/Register" className="button is-primary">
                                <strong>Sign Up</strong>
                                </Link> 
                              
                              <Link to="/Login" className="button is-primary">
                              <strong>Login</strong> 
                               </Link>  
                                 
                                </p>        
                            </div>                           
                              
                            </div>
                        </div>
                    </div>
        </nav> <br /> 
        </div>   
        
    );
}

export default Navbar;