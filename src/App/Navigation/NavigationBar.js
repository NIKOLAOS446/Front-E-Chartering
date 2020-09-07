import React from'react';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { BrowserRouter as Router, Route, Switch,Link } from "react-router-dom";
import CloudIcon from '@material-ui/icons/Cloud';


function NavigationBar(props) {

    const {signout , isShipowner, isCharterer}=props;
return(

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
                      <h1 className="title is-3"> E-CHARTERING</h1>
                      
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
                        <Link to="/Weather">
                      <button className="button is-light" >
                      <span className="icon">
                                     <CloudIcon></CloudIcon>
                                  </span>
                                  <span>Weather</span>                           
                            </button>
                            </Link>  
                    </p>
                      { props.isShipowner && <p className="control">
                        <Link to="/Statistics">
                      <button className="button is-light" >
                      <span className="icon">
                                     <EqualizerIcon></EqualizerIcon>
                                  </span>
                                  <span>Statistics</span>                           
                            </button>
                            </Link>  
                    </p>}
                    { props.isCharterer && <p className="control">
                        <Link to="/Top">
                      <button className="button is-light" >
                      <span className="icon">
                                      <i className="fa fa-trophy"></i>
                                  </span>
                                  <span>Top ShipOwners</span>                           
                            </button>
                            </Link>  
                    </p>}
                      <p className="control">
                        <Link to="/Map">
                      <button className="button is-light" >
                      <span className="icon">
                                      <i className="fa fa-map"></i>
                                  </span>
                                  <span>Map</span>                           
                            </button>
                            </Link>  
                    </p>
                    
                      <p className="control">
                      <Link to="/UserProfile">
                      <button className="button is-light">
                      <span className="icon">
                                      <i className="fa fa-user"></i>
                                  </span>
                                  <span>My Profile</span>                           
                            </button>
                            </Link> 
                    </p>
                          <p className="control">
                              <button
                                  className="button is-light"
                                  onClick={signout}
                              >
                                  <span className="icon">
                                      <i className="fa fa-power-off"></i>
                                  </span>
                                  <span>Log out</span>
                              </button>
                          </p>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>  
          </div>
)
}

export default NavigationBar;