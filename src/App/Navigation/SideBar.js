import React,{useEffect} from 'react';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
  import { makeStyles } from '@material-ui/core/styles';
  import Badge from '@material-ui/core/Badge';
  import ButtonGroup from '@material-ui/core/ButtonGroup';
  import Button from '@material-ui/core/Button';
  import AddIcon from '@material-ui/icons/Add';
  import RemoveIcon from '@material-ui/icons/Remove';
  import MailIcon from '@material-ui/icons/Mail';
  import Switch from '@material-ui/core/Switch';
  import FormControlLabel from '@material-ui/core/FormControlLabel';
  import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

function SideBar(Props) {
const {isCharterer, isShipowner, isAdmin, count, count1} = Props


    return (
      <div>
 
    <nav role="navigation" className="navigation" >      
        <ul className="navigation__links" >  
        
          <NavLink to="/" className="navigation__link" >
              <i className="fa fa-home" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--">Home</p>
         </NavLink>
         { Props.isAdmin &&   
          <NavLink to="/administration" className="navigation__link navigation__link--orange">
              <i className="fa fa-user" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--contact-me">Administration</p>
          </NavLink>
          }
          { Props.isAdmin &&   
          <NavLink to="/usercontrol" className="navigation__link navigation__link--orange">
              <i className="fa fa-user" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--contact-me">User Control</p>
          </NavLink>
          }
             
         { Props.isCharterer &&  
          <NavLink to="/S" className="navigation__link" >
              <i className="fa fa-search" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--">Search Ships</p>
         </NavLink>
          }
         { Props.isShipowner && 
          <NavLink to="/C" className="navigation__link" >
              <i className="fa fa-search" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--">Search Cargoes</p>
         </NavLink>
          }
         { Props.isShipowner &&   
          <NavLink to="/Ship" className="navigation__link" >
              <i className="fa fa-ship" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--home">Vessels</p>
         </NavLink>
         }
          
         {Props.isCharterer && 
          <NavLink to="/Cargoes" className="navigation__link navigation__link--teal" >
              <i className="fa fa-truck" aria-hidden="true"></i>
              <p className="navigation__text navigation__text--services">Cargoes</p>
          </NavLink>
          }
          
          { Props.isShipowner &&   
          <NavLink to="/Offers" className="navigation__link navigation__link--orange">
          <Badge color="secondary" badgeContent={count}>
          <MailIcon />
        </Badge>
              <p className="navigation__text navigation__text--contact-me">Offers</p>
          </NavLink>
          }

          { Props.isCharterer &&  
          <NavLink to="/OffersB" className="navigation__link navigation__link--orange">
          <Badge color="secondary" badgeContent={count1}>
          <MailIcon />
          </Badge>
              <p className="navigation__text navigation__text--contact-me">Offers</p>
          </NavLink>
           }

          { Props.isShipowner &&   
          <NavLink to="/Charters" className="navigation__link navigation__link--orange">
              <BusinessCenterIcon></BusinessCenterIcon>
              <p className="navigation__text navigation__text--contact-me">My Charters</p>
          </NavLink>
          }
          { Props.isCharterer &&   
          <NavLink to="/ChartersB" className="navigation__link navigation__link--orange">
          <BusinessCenterIcon></BusinessCenterIcon>
              <p className="navigation__text navigation__text--contact-me">My Charters</p>
          </NavLink>
          }

          
    
        </ul>
      </nav>   
      </div>
    )
}
export default SideBar;

