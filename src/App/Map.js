import React from 'react'
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import {Icon, Renderer} from 'leaflet';
import Geocode from "react-geocode";


const Ship = new Icon({
    iconUrl:"https://cdn2.iconfinder.com/data/icons/shipping-and-delivery-solid-collection/60/31_-_Shipping_and_Delivery_-_Solid_-_Cargo_Ship-512.png",
    iconSize:[30,30]
});

const Cargo = new Icon({
    iconUrl:"https://cdn5.vectorstock.com/i/1000x1000/83/09/warehouse-crane-cargo-icon-vector-18128309.jpg",
    iconSize:[30,30]
});

class MAP extends React.Component{
    constructor(props){
        super(props);
        this.state={
            coords:{
                latitude: 45,
                longitude:45
            }
        }
    }
    componentDidMount(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                let NewCoords={
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                this.setState({coords:NewCoords});
                console.log(this.state.coords);
            })

        }
        else
        console.log("Not Supported");
    }



    render(){
return(
    <div className="flex-container">
<Map center={[0, 0]} zoom={2}>
     <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
</Map>
 </div>
)}}

export default MAP;