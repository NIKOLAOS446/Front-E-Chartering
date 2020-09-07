import React from 'react'
import axios from 'axios'
import { UserConsumer } from '../../UserContext'
import CargoOwnerOffersList  from './CargoOwnerOffersList'



class CargoOwnerOffers extends React.Component{
    constructor(props){
      super(props);
      this.state={
        offers: [],
        loading: false,
        token:null,
        tempOffer:{}
      }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(`https://localhost:44321/api/ShipCargoRelations/GetShipCargoRelationsByCharterer`, {
            headers: { Authorization: "Bearer " + this.state.token }
        }).then(res => {
               // console.log(this.props.token);
                this.setState({ offers: res.data, loading: false })
                console.log("data prod", res.data)
            })
            .catch(err => this.setState({ loading: false }))
            ;
    }
    approveOffer = (offer) => {
       
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
       if (offer.id != null)
         {
             offer.isApproved= true;
            axios.put(`https://localhost:44321/api/ShipCargoRelations/` + offer.id, offer, config)
                .then(res => {                   
                    const newOffers = [...this.state.offers]
                    const index = newOffers.findIndex(pr => pr.id == offer.id)
                    if (index >= 0) {
                        newOffers.splice(index, 1);
                        this.setState({ offers: newOffers, tempOffer: null, loading: false })
                        
                    }
                    else {
                        this.setState({ loading: false })
                    }
                    
                })
                .catch(err => this.setState({ loading: false }))
                ;

        }
    }
    deleteOffer = (offer) => {       
        this.setState({ loading: true })       
        const config = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        };
        if (offer.id !=null){
        axios.delete(`https://localhost:44321/api/ShipCargoRelations/` + offer.id, config)
            .then(res => {
                const newOffers = [...this.state.offers]
                const index = newOffers.findIndex(pr => pr.id == offer.id)
                if (index >= 0) {
                    newOffers.splice(index, 1);
                    this.setState({ offers: newOffers, tempOffer: null, loading: false })
                }
                else {
                    this.setState({ loading: false })
                }
            })
            .catch(err => this.setState({ loading: false }))
            ;
        }
    }
    
    render(){
        return(
            <div>
                 <UserConsumer>{(token, Userid)=>
                {this.state.token=token}              
            }</UserConsumer>
                <CargoOwnerOffersList
                offers={this.state.offers}
                deleteOffer = {this.deleteOffer}
                approveOffer= {this.approveOffer}
                />
            </div>
        )
    }
}
    export default CargoOwnerOffers