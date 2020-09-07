import React, { useEffect } from 'react';
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import { UserConsumer } from '../UserContext'
import axios from 'axios';
import NavigationBar from './Navigation/NavigationBar';
import Ships from './Ships/Ships';
import Cargoes from './Cargoes/Cargoes';
import ShipsList from './Ships/ShipsList';
import SideBar from './Navigation/SideBar';
import ShipForm from './Ships/ShipForm';
import Home from './home';
import MAP from './Map';
import UserProfile from './UserProfile';
import SearchShips from './SearchShips/SearchShips';
import SearchCargoes from './SearchCargoes/SearchCargoes';
import ShipOwnerOffers from './ShipOwnerOffers/ShipOwnerOffers';
import ShipOwnerCharters from './ShipOwnerCharters/ShipOwnerCharters';
import Statistics from './Statistics/Statistics';
import Administration from './Administration/Administration';
import UserControl from './UserControl/UserControl';
import CargoOwnerOffers from './CargoOwnerOffers/CargoOwnerOffers';
import CargoOwnerCharters from './CargoOwnerCharters/CargoOwnerCharters';
import Top from './TopShipOwners/Top';
import Weather from './Weather/Weather';



class MainContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      offers: [],
      loading: false,
      count: null,
      count1:null
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    axios.get(`https://localhost:44321/api/ShipCargoRelations/GetShipCargoRelationsByShipOwner`, {
        headers: { Authorization: "Bearer " + this.state.token }
    }).then(res => {
           // console.log(this.props.token);
            this.setState({ count: res.data.length, loading: false })
            console.log("data prod", res.data)
            
        })
        .catch(err => this.setState({ loading: false }))
        ;


        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ShipCargoRelations/GetShipCargoRelationsByCharterer`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
               // console.log(this.props.token);
                this.setState({ count1: res.data.length, loading: false })
                console.log("data prod", res.data)
            })
            .catch(err => this.setState({ loading: false }))
            ;
}



  render() {
    return (
      <div>
        <UserConsumer>{(token, Userid) => { this.state.token = token }
        }</UserConsumer>
        <NavigationBar signout={this.props.signout} isShipowner={this.props.isShipowner} isCharterer={this.props.isCharterer} />
        <SideBar isShipowner={this.props.isShipowner} isCharterer={this.props.isCharterer} isAdmin={this.props.isAdmin} count={this.state.count} count1={this.state.count1}/>
        <div id="viewport">

          <div id="content">
            <Route exact path="/" component={Home} />
            <Route path="/S" component={SearchShips} />
            <Route path="/C" component={SearchCargoes} />
            <Route path="/Ship" component={Ships} />
            <Route path="/Cargoes" component={Cargoes} />
            <Route path="/Map" component={MAP} />
            <Route path="/Offers" component={ShipOwnerOffers}  />
            <Route path="/OffersB" component={CargoOwnerOffers} />
            <Route path="/Charters" component={ShipOwnerCharters} />
            <Route path="/ChartersB" component={CargoOwnerCharters} />
            <Route path="/Statistics" component={Statistics} />
            <Route path="/administration" component={Administration} />
            <Route path="/usercontrol" component={UserControl} />
            <Route path="/Top" component={Top} />
            <Route path="/Weather" component={Weather} />
            <Route path="/UserProfile" component={UserProfile} role={this.props.role} />

          </div>
        </div>
      </div>

    );
  }
}

export default MainContainer;